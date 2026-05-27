"use client";

import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "@/app/catalog/components/ProductCard";
import type { CatalogProduct } from "@/app/data/products";
import { CATALOG_API_URL } from "@/app/lib/catalogApi";

type CatalogResponse = {
  products: CatalogProduct[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    categories: string[];
  };
};

const PAGE_SIZE = 8;

const defaultMeta: CatalogResponse["meta"] = {
  page: 1,
  limit: PAGE_SIZE,
  total: 0,
  totalPages: 1,
  categories: [],
};

const CatalogPage = () => {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [meta, setMeta] = useState(defaultMeta);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  const requestUrl = useMemo(() => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(PAGE_SIZE),
      sort,
    });

    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    return `${CATALOG_API_URL}?${params.toString()}`;
  }, [category, maxPrice, minPrice, page, search, sort]);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(requestUrl, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки каталога: ${response.status}`);
        }

        const data = (await response.json()) as CatalogResponse;
        setProducts(data.products);
        setMeta(data.meta);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;

        console.error(err);
        setError("Не удалось загрузить каталог. Проверьте API или попробуйте обновить страницу.");
        setProducts([]);
        setMeta(defaultMeta);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [requestUrl]);


  const visiblePages = useMemo(() => {
    const pages: number[] = [];
    const totalPages = meta.totalPages;
    const firstPage = Math.max(1, meta.page - 2);
    const lastPage = Math.min(totalPages, meta.page + 2);

    for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber += 1) {
      pages.push(pageNumber);
    }

    return pages;
  }, [meta.page, meta.totalPages]);

  const resetFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSort("popular");
    setPage(1);
  };

  const handleFilterChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(event.target.value);
      setPage(1);
    };

  const renderSkeletons = () =>
    Array.from({ length: PAGE_SIZE }, (_, index) => (
      <div key={index} className="card bg-white border border-[#e6ded6] shadow-sm overflow-hidden">
        <div className="skeleton h-64 rounded-none bg-[#ece5df]" />
        <div className="p-5 space-y-3">
          <div className="skeleton h-6 w-3/4 bg-[#ece5df]" />
          <div className="skeleton h-4 w-full bg-[#ece5df]" />
          <div className="skeleton h-4 w-2/3 bg-[#ece5df]" />
          <div className="flex justify-between pt-4">
            <div className="skeleton h-7 w-24 bg-[#ece5df]" />
            <div className="skeleton h-9 w-24 bg-[#ece5df]" />
          </div>
        </div>
      </div>
    ));

  return (
    <main className="bg-[#F6F4F2] min-h-screen">
      <section className="bg-[url(/hero-bg.jpg)] bg-cover bg-center">
        <div className="bg-black/65 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-5 py-20 md:py-28 text-center text-white">
            <p className="uppercase tracking-[0.35em] text-xs md:text-sm text-gray-200 mb-4">Aquawel catalog</p>
            <h1 className="text-4xl md:text-7xl font-medium mb-5">Каталог мебели</h1>
            <p className="max-w-2xl mx-auto text-sm md:text-lg text-gray-100">
              Подберите мебель для ванной комнаты по категории, бюджету и стилю. Сейчас каталог работает на placeholder API,
              который легко заменить на реальный backend.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 py-10 md:py-14">
        <div className="bg-white rounded-2xl shadow-xl border border-[#e6ded6] p-4 md:p-6 -mt-20 relative z-10 mb-8">
          <label className="block text-sm text-gray-500 mb-2" htmlFor="catalog-search">
            Поиск по каталогу
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              id="catalog-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Например: тумба, зеркало, пенал..."
              className="input input-bordered w-full bg-[#F6F4F2] border-[#d8cec4] focus:outline-none focus:border-[#947458]"
            />
            <button
              type="button"
              onClick={resetFilters}
              className="btn btn-outline border-[#947458] text-[#947458] hover:border-[#947458] hover:bg-[#947458] hover:text-white md:w-44"
            >
              Сбросить
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
          <aside className="bg-white border border-[#e6ded6] rounded-2xl shadow-sm p-5 lg:sticky lg:top-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-semibold">Фильтры</h2>
              <span className="text-sm text-gray-500">{meta.total} шт.</span>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm text-gray-500 mb-2" htmlFor="catalog-category">
                  Категория
                </label>
                <select
                  id="catalog-category"
                  value={category}
                  onChange={handleFilterChange(setCategory)}
                  className="select select-bordered w-full bg-[#F6F4F2] border-[#d8cec4] focus:outline-none focus:border-[#947458]"
                >
                  <option value="">Все категории</option>
                  {meta.categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">Цена</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    min="0"
                    value={minPrice}
                    onChange={handleFilterChange(setMinPrice)}
                    placeholder="от"
                    className="input input-bordered w-full bg-[#F6F4F2] border-[#d8cec4] focus:outline-none focus:border-[#947458]"
                  />
                  <input
                    type="number"
                    min="0"
                    value={maxPrice}
                    onChange={handleFilterChange(setMaxPrice)}
                    placeholder="до"
                    className="input input-bordered w-full bg-[#F6F4F2] border-[#d8cec4] focus:outline-none focus:border-[#947458]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2" htmlFor="catalog-sort">
                  Сортировка
                </label>
                <select
                  id="catalog-sort"
                  value={sort}
                  onChange={handleFilterChange(setSort)}
                  className="select select-bordered w-full bg-[#F6F4F2] border-[#d8cec4] focus:outline-none focus:border-[#947458]"
                >
                  <option value="popular">Сначала популярные</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="title">По названию</option>
                </select>
              </div>
            </div>
          </aside>

          <div>
            {error && (
              <div className="alert bg-red-50 text-red-700 border border-red-200 mb-6">
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold">Товары</h2>
                <p className="text-sm text-gray-500">
                  Страница {meta.page} из {meta.totalPages} · показано до {PAGE_SIZE} товаров за запрос
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {isLoading ? renderSkeletons() : products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>

            {!isLoading && !error && products.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#e6ded6] p-10 text-center mt-6">
                <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
                <p className="text-gray-500 mb-5">Попробуйте изменить поисковый запрос или сбросить фильтры.</p>
                <button type="button" onClick={resetFilters} className="btn bg-[#947458] text-white hover:bg-[#7f624a] border-0">
                  Сбросить фильтры
                </button>
              </div>
            )}

            {!isLoading && !error && meta.total > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-white rounded-2xl border border-[#e6ded6] p-4">
                <button
                  type="button"
                  disabled={meta.page <= 1}
                  onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
                  className="btn btn-outline border-[#947458] text-[#947458] hover:border-[#947458] hover:bg-[#947458] hover:text-white disabled:opacity-40"
                >
                  Назад
                </button>

                <div className="join">
                  {meta.page > 3 && (
                    <button
                      type="button"
                      onClick={() => setPage(1)}
                      className="join-item btn bg-white border-[#e6ded6] text-[#171717]"
                    >
                      1
                    </button>
                  )}
                  {meta.page > 4 && <button type="button" className="join-item btn bg-white border-[#e6ded6]" disabled>...</button>}
                  {visiblePages.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`join-item btn ${
                        pageNumber === meta.page
                          ? "bg-[#947458] text-white border-[#947458]"
                          : "bg-white border-[#e6ded6] text-[#171717]"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                  {meta.page < meta.totalPages - 3 && <button type="button" className="join-item btn bg-white border-[#e6ded6]" disabled>...</button>}
                  {meta.page < meta.totalPages - 2 && (
                    <button
                      type="button"
                      onClick={() => setPage(meta.totalPages)}
                      className="join-item btn bg-white border-[#e6ded6] text-[#171717]"
                    >
                      {meta.totalPages}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  disabled={meta.page >= meta.totalPages}
                  onClick={() => setPage((currentPage) => Math.min(currentPage + 1, meta.totalPages))}
                  className="btn btn-outline border-[#947458] text-[#947458] hover:border-[#947458] hover:bg-[#947458] hover:text-white disabled:opacity-40"
                >
                  Вперед
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CatalogPage;
