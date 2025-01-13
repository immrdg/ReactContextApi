import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, Hash } from 'lucide-react';
import { Product } from '../types/product.ts';
import { useForm } from '../hooks/useForm.tsx';
import FormField from '../ui/form/FormField.tsx';
import Input from '../ui/form/Input.tsx';
import FormActions from '../ui/form/FormActions.tsx';

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
      <FormField label="Product Name" error={errors.ProductName}>
        <Input
          type="text"
          name="ProductName"
          value={values.ProductName}
          onChange={handleChange}
          placeholder="Enter product name"
          icon={<Package className="h-5 w-5 text-gray-400" />}
        />
      </FormField>

      <FormField label="Quantity" error={errors.Quantity}>
        <Input
          type="number"
          name="Quantity"
          value={values.Quantity}
          onChange={handleChange}
          placeholder="Enter quantity"
          min="0"
          icon={<Hash className="h-5 w-5 text-gray-400" />}
        />
      </FormField>

      <FormField label="Price" error={errors.Price}>
        <Input
          type="number"
          step="0.01"
          name="Price"
          value={values.Price}
          onChange={handleChange}
          placeholder="Enter price"
          min="0"
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
        />
      </FormField>

      <FormActions
        onCancel={() => navigate('/products')}
        isSubmitting={isSubmitting}
        submitText={buttonText}
      />
    </form>
  );
}