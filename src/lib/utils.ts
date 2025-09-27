import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | null | undefined, fallback = '$0.00') {
  if (value == null || Number.isNaN(value)) return fallback;
  return currencyFormatter.format(value);
}
