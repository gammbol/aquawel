"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/app/catalog/components/ProductCard";
import type { CollectionProduct, FurnitureCollection } from "@/app/data/collections";
import { COLLECTIONS_API_URL, LEAD_API_URL } from "@/app/lib/catalogApi";

type CollectionsResponse = {
  collections: FurnitureCollection[];
};

type LeadForm = {
  name: string;
  email: string;
  phone: string;
  wishes: string;
};

type Toast = {
  type: "success" | "error";
  message: string;
};

const initialForm: LeadForm = {
  name: "",
  email: "",
  phone: "",
  wishes: "",
};

const getGridClassName = (productCount: number) => {
  if (productCount === 1) {
    return "grid grid-cols-1 gap-6 max-w-md mx-auto";
  }

  if (productCount === 2) {
    return "grid grid-cols-1 gap-6 md:grid-cols-2 max-w-4xl mx-auto";
  }

  return "grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3";
};

const getProductWord = (count: number) => {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder10 === 1 && remainder100 !== 11) return "изделие";
  if ([2, 3, 4].includes(remainder10) && ![12, 13, 14].includes(remainder100)) return "изделия";

  return "изделий";
};

const CatalogPage = () => {
  const [collections, setCollections] = useState<FurnitureCollection[]>([]);
  const [activeCollectionId, setActiveCollectionId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<FurnitureCollection | null>(null);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCollections = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(COLLECTIONS_API_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки коллекций: ${response.status}`);
        }

        const data = (await response.json()) as CollectionsResponse;
        setCollections(data.collections);
        setActiveCollectionId(data.collections[0]?.id ?? "");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setError("Не удалось загрузить коллекции. Проверьте API или попробуйте обновить страницу.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCollections();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeout = window.setTimeout(() => {
      setToast(null);
    }, 4200);

    return () => window.clearTimeout(timeout);
  }, [toast]);

  const activeCollection = useMemo(
    () => collections.find((collection) => collection.id === activeCollectionId) ?? collections[0] ?? null,
    [activeCollectionId, collections],
  );

  const openLeadModal = (product: CollectionProduct, collection: FurnitureCollection) => {
    setSelectedProduct(product);
    setSelectedCollection(collection);
    setForm(initialForm);
    setFormError("");
  };

  const closeLeadModal = () => {
    if (isSending) return;

    setSelectedProduct(null);
    setSelectedCollection(null);
    setForm(initialForm);
    setFormError("");
  };

  const handleFormChange = (field: keyof LeadForm) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((currentForm) => ({
        ...currentForm,
        [field]: event.target.value,
      }));
    };

  const handleSubmitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    if (!selectedProduct || !selectedCollection) return;

    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setFormError("Заполните имя, email и телефон.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setFormError("Введите корректный email.");
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch(LEAD_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          wishes: form.wishes.trim(),
          productId: selectedProduct.id,
          productTitle: selectedProduct.title,
          collectionId: selectedCollection.id,
          collectionName: selectedCollection.name,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка отправки заявки: ${response.status}`);
      }

      setSelectedProduct(null);
      setSelectedCollection(null);
      setForm(initialForm);
      setToast({
        type: "success",
        message: "Заявка отправлена. Менеджер Aquawel свяжется с вами для уточнения деталей.",
      });
    } catch (err) {
      console.error(err);
      setSelectedProduct(null);
      setSelectedCollection(null);
      setToast({
        type: "error",
        message: "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с компанией напрямую.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const isLeadModalOpen = Boolean(selectedProduct && selectedCollection);

  return (
    <main className="min-h-screen bg-[#F6F4F2]">
      <section className="bg-[url(/hero-bg.jpg)] bg-cover bg-center">
        <div className="bg-black/65 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-5 py-20 text-center text-white md:py-28">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gray-200 md:text-sm">Aquawel collections</p>
            <h1 className="mb-5 text-4xl font-medium md:text-7xl">Коллекции мебели</h1>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-100 md:text-lg">
              Витрина готовых стилистических решений для розничных клиентов, дизайнеров и комплексных поставок
              застройщикам.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="relative z-10 -mt-20 mb-8 rounded-3xl border border-[#e6ded6] bg-white p-4 shadow-xl md:p-6">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-[#947458]">Выберите коллекцию</p>
              <h2 className="text-3xl font-semibold md:text-4xl">Каталог-витрина Aquawel</h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-gray-500">
              Коллекция объединяет несколько изделий в одной стилистике. Переключение ниже меняет весь набор товаров
              без перезагрузки страницы.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 5 }, (_, index) => (
                <div key={index} className="skeleton h-11 w-36 rounded-full bg-[#ece5df]" />
              ))}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2 md:flex-wrap md:overflow-visible">
              {collections.map((collection) => {
                const isActive = collection.id === activeCollection?.id;

                return (
                  <button
                    key={collection.id}
                    type="button"
                    onClick={() => setActiveCollectionId(collection.id)}
                    className={`shrink-0 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "border-[#947458] bg-[#947458] text-white shadow-lg"
                        : "border-[#e0d6cc] bg-[#F6F4F2] text-[#171717] hover:border-[#947458] hover:text-[#947458]"
                    }`}
                  >
                    {collection.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            {error}
          </div>
        )}

        {!isLoading && activeCollection && (
          <div key={activeCollection.id} className="animate-[collectionFade_420ms_ease]">
            <div className="mb-8 grid gap-5 rounded-3xl border border-[#e6ded6] bg-white p-6 shadow-sm lg:grid-cols-[0.75fr_1.25fr] lg:p-8">
              <div>
                <p className="mb-2 text-sm uppercase tracking-[0.24em] text-[#947458]">{activeCollection.name}</p>
                <h2 className="text-3xl font-semibold md:text-5xl">{activeCollection.subtitle}</h2>
              </div>
              <div className="text-sm leading-7 text-gray-600 md:text-base">
                <p>{activeCollection.description}</p>
                <p className="mt-4 text-[#947458]">
                  В коллекции: {activeCollection.products.length} {getProductWord(activeCollection.products.length)}
                </p>
              </div>
            </div>

            <div className={getGridClassName(activeCollection.products.length)}>
              {activeCollection.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  collection={activeCollection}
                  onBuy={openLeadModal}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {isLeadModalOpen && selectedProduct && selectedCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-[modalBackdrop_220ms_ease]">
          <div className="grid max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-[modalEnter_260ms_ease] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative hidden min-h-[620px] overflow-hidden bg-[#171717] lg:block">
              <ImagePreview product={selectedProduct} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gray-200">{selectedCollection.name}</p>
                <h2 className="text-4xl font-semibold">{selectedProduct.title}</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-gray-100">{selectedProduct.description}</p>
              </div>
            </div>

            <div className="overflow-y-auto p-5 md:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#947458]">Заявка на изделие</p>
                  <h2 className="text-3xl font-semibold">Оставить заявку</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    Укажите контакты, и менеджер уточнит комплектацию, размеры, сроки и условия заказа.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeLeadModal}
                  className="btn btn-circle btn-ghost text-2xl text-gray-500 hover:text-[#171717]"
                  aria-label="Закрыть окно заявки"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 rounded-2xl bg-[#F6F4F2] p-4">
                <p className="text-sm text-gray-500">Выбранное изделие</p>
                <p className="font-medium text-[#171717]">{selectedProduct.title}</p>
                <p className="mt-1 text-sm text-[#947458]">{selectedCollection.name}</p>
              </div>

              <form onSubmit={handleSubmitLead} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="lead-name">
                    Имя *
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    value={form.name}
                    onChange={handleFormChange("name")}
                    className="input input-bordered w-full border-[#d8cec4] bg-[#F6F4F2] focus:border-[#947458] focus:outline-none"
                    placeholder="Ваше имя"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="lead-email">
                    Электронная почта *
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange("email")}
                    className="input input-bordered w-full border-[#d8cec4] bg-[#F6F4F2] focus:border-[#947458] focus:outline-none"
                    placeholder="example@domain.com"
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="lead-phone">
                    Телефон *
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleFormChange("phone")}
                    className="input input-bordered w-full border-[#d8cec4] bg-[#F6F4F2] focus:border-[#947458] focus:outline-none"
                    placeholder="+7 999 000-00-00"
                    autoComplete="tel"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="lead-wishes">
                    Пожелания
                  </label>
                  <textarea
                    id="lead-wishes"
                    value={form.wishes}
                    onChange={handleFormChange("wishes")}
                    className="textarea textarea-bordered min-h-28 w-full border-[#d8cec4] bg-[#F6F4F2] focus:border-[#947458] focus:outline-none"
                    placeholder="Например: нужен комплект под размер, интересует оптовая поставка, требуется консультация дизайнера..."
                  />
                </div>

                {formError && (
                  <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn w-full border-0 bg-[#947458] py-4 text-white shadow-xl transition-all hover:bg-[#7f624a] hover:shadow-sm disabled:opacity-60"
                >
                  {isSending ? "Отправка..." : "Отправить заявку"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] w-[calc(100%-2.5rem)] max-w-md animate-[toastSlide_320ms_ease] rounded-2xl border bg-white p-4 shadow-2xl sm:bottom-8 sm:right-8 sm:w-full">
          <div className="flex gap-3">
            <span
              className={`mt-1 h-3 w-3 shrink-0 rounded-full ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
            />
            <div>
              <p className="font-medium text-[#171717]">
                {toast.type === "success" ? "Заявка отправлена" : "Ошибка отправки"}
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-500">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

const ImagePreview = ({ product }: { product: CollectionProduct }) => (
  <Image
    src={product.images[0] || "/logo.jpg"}
    alt={product.title}
    fill
    sizes="40vw"
    className="object-cover"
  />
);

export default CatalogPage;
