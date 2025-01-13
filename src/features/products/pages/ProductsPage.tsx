import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Loader2, Plus } from 'lucide-react';
import { useProducts } from '../context/ProductContext.tsx';
import ProductTable from '../components/ProductTable.tsx';
import Pagination from '../ui/Pagination.tsx';
import ExportMenu from '../ui/export/ExportMenu.tsx';
import ConfirmDialog from '../ui/ConfirmDialog.tsx';
import ErrorMessage from '../ui/ErrorMessage.tsx';
import EmptyState from '../components/EmptyState.tsx';
import { generateCSV, downloadCSV, formatDate } from '../utils/exportHelpers.ts';

export default function ProductsPage() {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  
  const {
    products,
    allProducts,
    loading,
    error,
    currentPage,
    totalPages,
    searchQuery,
    setCurrentPage,
    setSearchQuery,
    deleteProduct,
  } = useProducts();

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
      setShowDeleteDialog(false);
      setProductToDelete(null);
    }
  };

  const handleExport = (exportAll: boolean) => {
    const dataToExport = exportAll ? allProducts : products;
    const csv = generateCSV(dataToExport);
    const date = formatDate();
    const filename = `techstore_products_${exportAll ? 'full' : 'page'}_${date}.csv`;
    downloadCSV(csv, filename);
  };

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

  const showEmptyState = allProducts.length === 0;
  const showNoResults = !showEmptyState && allProducts.length > 0 && products.length === 0;

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

      {!showEmptyState && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {products.length > 0 && (
              <ExportMenu 
                onExport={handleExport}
                totalItems={allProducts.length}
                currentPageItems={products.length}
              />
            )}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {showEmptyState ? (
            <EmptyState type="no-products" />
          ) : showNoResults ? (
            <EmptyState type="no-results" searchQuery={searchQuery} />
          ) : (
            <ProductTable products={products} onDelete={handleDelete} />
          )}
        </div>

        {!showEmptyState && !showNoResults && products.length > 0 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowDeleteDialog(false);
          setProductToDelete(null);
        }}
      />
    </div>
  );
}