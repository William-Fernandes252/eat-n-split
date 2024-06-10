import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Get the initials of a name
 *
 * @param name The name to get the initials from
 * @returns The initials of the name
 */
export function initials(name: string) {
	return name
		.split(" ")
		.map((word) => word[0].toUpperCase())
		.join("");
}

/**
 * Format a value as currency
 *
 * @param value The value to format
 * @param currency The currency to use
 * @returns The value formatted as currency
 */
export function currency(value: number, currency = "USD") {
	return new Intl.NumberFormat(navigator.language, {
		style: "currency",
		currency,
	}).format(value);
}
