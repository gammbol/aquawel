import { NextRequest, NextResponse } from "next/server";
import { catalogProducts } from "@/app/data/products";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 8;
const MAX_LIMIT = 24;

const parsePositiveNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const search = (searchParams.get("search") ?? "").trim().toLowerCase();
  const category = (searchParams.get("category") ?? "").trim();
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");
  const minPrice = minPriceParam ? Number(minPriceParam) : null;
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : null;
  const sort = searchParams.get("sort") ?? "popular";
  const page = parsePositiveNumber(searchParams.get("page"), DEFAULT_PAGE);
  const limit = Math.min(parsePositiveNumber(searchParams.get("limit"), DEFAULT_LIMIT), MAX_LIMIT);

  const allCategories = Array.from(new Set(catalogProducts.map((product) => product.category))).sort((a, b) =>
    a.localeCompare(b, "ru"),
  );

  let filteredProducts = catalogProducts.filter((product) => {
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.material.toLowerCase().includes(search);

    const matchesCategory = !category || product.category === category;
    const matchesMinPrice = minPrice === null || !Number.isFinite(minPrice) || product.price >= minPrice;
    const matchesMaxPrice = maxPrice === null || !Number.isFinite(maxPrice) || product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "title":
        return a.title.localeCompare(b.title, "ru");
      default:
        return a.id - b.id;
    }
  });

  const total = filteredProducts.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * limit;
  const products = filteredProducts.slice(start, start + limit);

  return NextResponse.json({
    products,
    meta: {
      page: safePage,
      limit,
      total,
      totalPages,
      categories: allCategories,
    },
  });
}
