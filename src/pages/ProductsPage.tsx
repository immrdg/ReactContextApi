import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Loader2, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductTable from '../components/ProductTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductsPage() {
  const navigate = useNavigate();
  const {
    products,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    setCurrentPage,
    setSearchQuery,
  } = useProducts();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-blue-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Available Products</h1>
        </div>
        <button
          onClick={() => navigate('/products/add')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <ProductTable products={products} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}