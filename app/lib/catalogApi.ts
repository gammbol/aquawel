export const COLLECTIONS_API_URL =
  process.env.NEXT_PUBLIC_COLLECTIONS_API_URL ||
  process.env.NEXT_PUBLIC_CATALOG_API_URL ||
  "/api/catalog";

export const LEAD_API_URL =
  process.env.NEXT_PUBLIC_LEAD_API_URL ||
  process.env.NEXT_PUBLIC_ORDER_API_URL ||
  "/api/leads";

// Backward-compatible aliases for the existing landing application form.
export const CATALOG_API_URL = COLLECTIONS_API_URL;
export const ORDER_API_URL = LEAD_API_URL;
