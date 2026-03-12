import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(new Date(date));
};
export const getEnv = (key: string) => import.meta.env[`VITE_${key}`] || "";
export const getLocalStorage = (key: string) => localStorage.getItem(key);
export const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
