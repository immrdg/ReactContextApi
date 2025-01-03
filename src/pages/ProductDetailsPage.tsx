import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ConfirmDialog from '../components/ConfirmDialog';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, deleteProduct } = useProducts();
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  
  const product = products.find(p => p.id === id);
  console.log("Products: ")
  products.forEach(x=>console.log(x))
  console.log("Product: "+product)

  if (!product) {
    return <ErrorMessage 
      title="Product Not Found"
      message={`The product you're looking for doesn't exist or has been removed. ${id}`}
    />;
  }

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Package className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">{product.ProductName}</h1>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => navigate(`/products/edit/${product.id}`)}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Quantity</h2>
                <p className="mt-1 text-lg text-gray-900">{product.Quantity} units</p>
              </div>
              <div>
                <h2 className="text-sm font-medium text-gray-500">Price</h2>
                <p className="mt-1 text-lg text-gray-900">${product.Price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}