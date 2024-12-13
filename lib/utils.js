import { clsx } from "clsx";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  if (!date) return "";
  return format(new Date(date), "dd MMM yyyy", { locale: enUS });
}
