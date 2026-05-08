// lib/utils-price.ts
// Utilidades de precio — seguras para usar en Client Components

export const formatPrice = (price: string | number): string => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num) || num === 0) return "Consultar";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(num);
};

export const calculateBulkPrice = (
  price: string | number,
  discountPercent: number = 0
): number => {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return 0;
  return num * (1 - discountPercent / 100);
};