import React from 'react';
import { Package } from 'lucide-react';
import ProductForm from '../components/ProductForm.tsx';
import { useProducts } from '../context/ProductContext.tsx';

export default function AddProductPage() {
  const { addProduct } = useProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProductForm
            onSubmit={addProduct}
            buttonText="Add Product"
          />
        </div>
      </div>
    </div>
  );
}