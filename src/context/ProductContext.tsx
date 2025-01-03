import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import api from '../api/axios';

interface ProductContextType {
  products: Product[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 5;

  const fetchProducts = async () => {
    try {
      const { data } = await api.get<Product[]>('/products');
      setProducts(data);
      products.forEach(x=>console.log(x))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data } = await api.post<Product>('/products', product);
      setProducts(prev => [...prev, data]);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add product');
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      await api.put(`/products/${product.id}`, product);
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update product');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const value = {
    products: filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
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
    setSearchQuery,
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