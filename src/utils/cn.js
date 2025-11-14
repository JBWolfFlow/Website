import { clsx } from 'clsx';

/**
 * Utility function to merge class names using clsx
 * @param {...any} inputs - Class names to merge
 * @returns {string} Merged class names
 * 
 * @example
 * cn('base-class', condition && 'conditional-class', { 'object-class': true })
 */
export function cn(...inputs) {
  return clsx(inputs);
}