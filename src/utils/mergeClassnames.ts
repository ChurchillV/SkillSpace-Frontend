import clsx from "clsx";
import { twMerge } from "tailwind-merge"; // Helps merge conflicting Tailwind classes

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
