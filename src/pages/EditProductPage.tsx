import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import ErrorMessage from '../components/ErrorMessage';

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return <ErrorMessage 
      title="Product Not Found"
      message="The product you're trying to edit doesn't exist or has been removed."
    />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Package className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProductForm
            initialValues={product}
            onSubmit={updateProduct}
            buttonText="Update Product"
          />
        </div>
      </div>
    </div>
  );
}