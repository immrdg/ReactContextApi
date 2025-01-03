import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';

interface ProductTableProps {
  products: Product[];
}

export default function ProductTable({ products }: ProductTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleRowClick(product.id)}
                className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.ProductName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.Quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.Price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}