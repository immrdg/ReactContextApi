import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { useForm } from '../hooks/useForm';

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: never) => Promise<void>;
  buttonText: string;
}

export default function ProductForm({ initialValues, onSubmit, buttonText }: ProductFormProps) {
  const navigate = useNavigate();
  
  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
    initialValues: initialValues || {
      ProductName: '',
      Quantity: '',
      Price: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.ProductName) {
        errors.ProductName = 'Product name is required';
      }
      if (!values.Quantity || values.Quantity < 0) {
        errors.Quantity = 'Quantity must be a positive number';
      }
      if (!values.Price || values.Price <= 0) {
        errors.Price = 'Price must be greater than 0';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await onSubmit({
          ...values,
          Quantity: Number(values.Quantity),
          Price: Number(values.Price),
        });
        navigate('/products');
      } catch (error) {
        console.error('Form submission error:', error);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="ProductName" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          id="ProductName"
          name="ProductName"
          value={values.ProductName}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.ProductName && (
          <p className="mt-1 text-sm text-red-600">{errors.ProductName}</p>
        )}
      </div>

      <div>
        <label htmlFor="Quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="Quantity"
          name="Quantity"
          value={values.Quantity}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.Quantity && (
          <p className="mt-1 text-sm text-red-600">{errors.Quantity}</p>
        )}
      </div>

      <div>
        <label htmlFor="Price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            step="0.01"
            id="Price"
            name="Price"
            value={values.Price}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 pl-7 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        {errors.Price && (
          <p className="mt-1 text-sm text-red-600">{errors.Price}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  );
}