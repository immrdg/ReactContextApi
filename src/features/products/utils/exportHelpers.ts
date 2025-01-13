import { Product } from '../types/product.ts';

/**
 * Formats the current date as YYYY-MM-DD
 * @returns {string} Formatted date string
 */
export const formatDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

/**
 * Generates CSV content from product data
 * @param {Product[]} products - Array of products to convert to CSV
 * @returns {string} CSV formatted string
 */
export const generateCSV = (products: Product[]): string => {
  const headers = ['Product Name', 'Quantity in Stock', 'Price (USD)'];
  const rows = products.map(product => [
    product.ProductName,
    product.Quantity,
    product.Price.toFixed(2)
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
};

/**
 * Creates and triggers download of CSV file
 * @param {string} csv - CSV content
 * @param {string} filename - Name for the downloaded file
 */
export const downloadCSV = (csv: string, filename: string): void => {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};