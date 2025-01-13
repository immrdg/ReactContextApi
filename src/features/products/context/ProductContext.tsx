import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product.ts';
import api from '../api/axios.ts';

interface ProductContextType {
  products: Product[];
  allProducts: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  totalPages: number;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const { data } = await api.get<Product[]>('/products');
      setAllProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = allProducts.filter(product =>
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages based on filtered results
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  // Adjust current page if it exceeds the new total pages after filtering
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [searchQuery, totalPages]);

  // Get paginated products from filtered results
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data } = await api.post<Product>('/products', product);
      setAllProducts(prev => [...prev, data]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await api.put(`/products/${product.id}`, product);
      setAllProducts(prev => prev.map(p => p.id === product.id ? product : p));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setAllProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  // Wrapper for setSearchQuery that resets pagination
  const handleSetSearchQuery = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const value = {
    products: paginatedProducts,
    allProducts: filteredProducts,
    loading,
    error,
    currentPage,
    itemsPerPage,
    searchQuery,
    totalPages,
    addProduct,
    updateProduct,
    deleteProduct,
    setCurrentPage,
    setSearchQuery: handleSetSearchQuery,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}