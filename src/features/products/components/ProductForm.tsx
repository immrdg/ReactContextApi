import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Package, Hash } from 'lucide-react';
import { Formik, Form, Field, FormikHelpers, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { Product } from '../types/product';
import FormField from '../ui/form/FormField';
import Input from '../ui/form/Input';
import FormActions from '../ui/form/FormActions';

// Define the shape of form values
interface FormValues {
  ProductName: string;
  Quantity: number | string;
  Price: number | string;
}

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: Omit<Product, 'id'>) => Promise<void>;
  buttonText: string;
}

// Validation schema with Yup
const ProductSchema = Yup.object().shape({
  ProductName: Yup.string()
      .min(2, 'Product name must be at least 2 characters')
      .max(50, 'Product name must be less than 50 characters')
      .required('Product name is required'),
  Quantity: Yup.number()
      .typeError('Quantity must be a number')
      .min(1, 'Quantity must be 1 or greater')
      .required('Quantity is required')
      .integer('Quantity must be a whole number'),
  Price: Yup.number()
      .typeError('Price must be a number')
      .min(0.01, 'Price must be greater than 0')
      .required('Price is required')
      .test('is-decimal', 'Price must have 2 decimal places or less',
          (value) => !value || /^\d+(\.\d{0,2})?$/.test(value.toString()))
});

export default function ProductForm({ initialValues, onSubmit, buttonText }: ProductFormProps) {
  const navigate = useNavigate();

  // Default form values (handling case when initialValues are undefined)
  const defaultValues: FormValues = {
    ProductName: initialValues?.ProductName || '',
    Quantity: initialValues?.Quantity || '',
    Price: initialValues?.Price || '',
  };

  const handleSubmit = async (
      values: FormValues,
      { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      if (Number(values.Price) <= 0) {
        setFieldError('Price', 'Price must be greater than 0');
        setSubmitting(false);
        return;
      }

      await onSubmit({
        ProductName: values.ProductName,
        Quantity: Number(values.Quantity),
        Price: Number(values.Price),
      });
      navigate('/products');
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // Updated typing for getFieldError function
  const getFieldError = (
      fieldName: keyof FormValues,
      touched: FormikTouched<FormValues>, // Explicitly type this
      errors: FormikErrors<FormValues> // Explicitly type this
  ): string | undefined => {
    return touched[fieldName] && errors[fieldName] ? String(errors[fieldName]) : undefined;
  };

  return (
      <Formik<FormValues> // Explicitly set FormValues as the generic type here
          initialValues={defaultValues}
          validationSchema={ProductSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
      >
        {({ errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <FormField
                  label="Product Name"
                  error={getFieldError('ProductName', touched, errors)}
              >
                <Field
                    as={Input}
                    type="text"
                    name="ProductName"
                    placeholder="Enter product name"
                    icon={<Package className="h-5 w-5 text-gray-400" />}
                />
              </FormField>

              <FormField
                  label="Quantity"
                  error={getFieldError('Quantity', touched, errors)}
              >
                <Field
                    as={Input}
                    type="number"
                    name="Quantity"
                    placeholder="Enter quantity"
                    min="1"
                    icon={<Hash className="h-5 w-5 text-gray-400" />}
                />
              </FormField>

              <FormField
                  label="Price"
                  error={getFieldError('Price', touched, errors)}
              >
                <Field
                    as={Input}
                    type="number"
                    step="0.01"
                    name="Price"
                    placeholder="Enter price"
                    min="0.01"
                    icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                />
              </FormField>

              <FormActions
                  onCancel={() => navigate('/products')}
                  isSubmitting={isSubmitting}
                  submitText={buttonText}
              />
            </Form>
        )}
      </Formik>
  );
}