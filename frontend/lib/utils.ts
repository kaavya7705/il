import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS classes with conditional logic support
 * 
 * This utility function combines the functionality of clsx and tailwind-merge:
 * - clsx: For conditionally joining class names together
 * - tailwind-merge: For properly handling Tailwind CSS class conflicts
 * 
 * @param {...ClassValue[]} inputs - Class names, objects, or arrays to be combined
 * @returns {string} - Merged class string with Tailwind conflicts resolved
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}