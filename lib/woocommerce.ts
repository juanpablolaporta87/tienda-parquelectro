// lib/woocommerce.ts
// ⚠️ Solo Server Components y API Routes — nunca importar en "use client"

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  images: { src: string; alt: string }[];
  categories: { id: number; name: string; slug: string }[];
  stock_status: string;
  stock_quantity: number | null;
};

export type WooCategory = {
  id: number;
  name: string;
  slug: string;
  count: number;
};

// ── helpers internos ──────────────────────────────────────────

function getAuthHeader(): string {
  const key    = process.env.WC_CONSUMER_KEY!;
  const secret = process.env.WC_CONSUMER_SECRET!;
  return "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
}

function wcFetch(endpoint: string, params: Record<string, string> = {}) {
  const base  = process.env.WC_URL!.replace(/\/$/, "");
  const query = new URLSearchParams(params).toString();
  const url   = `${base}/wp-json/wc/v3/${endpoint}${query ? "?" + query : ""}`;
  return fetch(url, {
    headers: { Authorization: getAuthHeader() },
    next: { revalidate: 60 },
  });
}

// ── funciones exportadas ──────────────────────────────────────

export async function getProducts(
  params: Record<string, string> = {}
): Promise<WooProduct[]> {
  try {
    const res = await wcFetch("products", { per_page: "100", status: "publish", ...params });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getProduct(slug: string): Promise<WooProduct | null> {
  try {
    const res = await wcFetch("products", { slug });
    if (!res.ok) return null;
    const data: WooProduct[] = await res.json();
    return data[0] ?? null;
  } catch {
    return null;
  }
}

export async function getCategories(): Promise<WooCategory[]> {
  try {
    const res = await wcFetch("products/categories", { per_page: "50", hide_empty: "true" });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function createOrder(data: Record<string, unknown>) {
  try {
    const base = process.env.WC_URL!.replace(/\/$/, "");
    const res = await fetch(`${base}/wp-json/wc/v3/orders`, {
      method: "POST",
      headers: {
        Authorization: getAuthHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear orden");
    return res.json();
  } catch {
    return { id: null, status: "error" };
  }
}

// ── utilidades de formato ─────────────────────────────────────

export const formatPrice = (price: string | number): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return "Consultar";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(num);
};

export const getProductImage = (product: WooProduct): string =>
  product?.images?.[0]?.src ?? "/images/placeholder.jpg";

export const calculateBulkPrice = (
  price: string | number,
  discountPercent: number = 0
): number => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return 0;
  return num * (1 - discountPercent / 100);
};