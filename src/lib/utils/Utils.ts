/**
 * Sleep function to pause execution for a given number of milliseconds.
 * @param ms - Time to sleep in milliseconds
 * @returns A promise that resolves after the specified time
 */
export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

function luminance(hex: string): number {
	const a = hex
		.replace('#', '')
		.match(/.{2}/g)!
		.map((v) => {
			const n = parseInt(v, 16) / 255;
			return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
		});
	return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export const contrastRatio = (hex1: string, hex2: string): number => {
	const lum1 = luminance(hex1);
	const lum2 = luminance(hex2);
	const brightest = Math.max(lum1, lum2);
	const darkest = Math.min(lum1, lum2);
	return (brightest + 0.05) / (darkest + 0.05);
};

export const getContrastRating = (ratio: number): 'Bad' | 'Medium' | 'Good' => {
	if (ratio >= 7) return 'Good';
	if (ratio >= 4.5) return 'Medium';
	return 'Bad';
};
