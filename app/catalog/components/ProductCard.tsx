import Image from "next/image";
import type { CatalogProduct } from "@/app/data/products";

interface ProductCardProps {
  product: CatalogProduct;
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);

const ProductCard = ({ product }: ProductCardProps) => {
  const previewImage = product.images[0] || "/logo.jpg";

  return (
    <article className="group card bg-white shadow-sm border border-[#e6ded6] overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <figure className="relative h-64 bg-[#F6F4F2] overflow-hidden">
        <Image
          src={previewImage}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#947458] shadow-sm">
          {product.category}
        </span>
      </figure>

      <div className="card-body p-5 flex flex-col">
        <div className="flex-grow">
          <h2 className="card-title text-xl leading-tight text-[#171717]">{product.title}</h2>
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-gray-400">{product.material}</p>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="text-xl font-semibold text-[#947458]">{formatPrice(product.price)}</p>
          <button className="btn btn-outline btn-sm border-[#947458] text-[#947458] hover:border-[#947458] hover:bg-[#947458] hover:text-white">
            Подробнее
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
