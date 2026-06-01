import Image from "next/image";
import type { CollectionProduct, FurnitureCollection } from "@/app/data/collections";

interface ProductCardProps {
  product: CollectionProduct;
  collection: FurnitureCollection;
  onBuy: (product: CollectionProduct, collection: FurnitureCollection) => void;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

const ProductCard = ({ product, collection, onBuy }: ProductCardProps) => {
  const previewImage = product.images[0] || "/logo.jpg";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#e6ded6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden bg-[#F6F4F2] sm:h-72">
        <Image
          src={previewImage}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#947458] shadow-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="mb-4">
          <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#947458]">{collection.name}</p>
          <h2 className="text-2xl leading-tight text-[#171717]">{product.title}</h2>
          <p className="mt-3 text-sm leading-6 text-gray-500">{product.description}</p>
        </div>

        <ul className="mb-6 space-y-2 text-sm text-gray-600">
          {product.specs.map((spec) => (
            <li key={spec} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#947458]" />
              <span>{spec}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 border-t border-[#eee7e1] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-semibold text-[#947458]">от {formatPrice(product.price)}</p>
          <button
            type="button"
            onClick={() => onBuy(product, collection)}
            className="btn border-0 bg-[#947458] px-7 text-white shadow-lg transition-all hover:bg-[#7f624a] hover:shadow-sm"
          >
            Купить
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
