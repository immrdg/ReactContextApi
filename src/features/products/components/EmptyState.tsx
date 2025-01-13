import React from 'react';
import { PackageX, Search } from 'lucide-react';

interface EmptyStateProps {
  type: 'no-products' | 'no-results';
  searchQuery?: string;
}

export default function EmptyState({ type, searchQuery }: EmptyStateProps) {
  const config = {
    'no-products': {
      icon: <PackageX className="h-12 w-12 text-gray-400" />,
      title: 'No Products Available',
      description: 'Start by adding your first product to the inventory.',
      actionLabel: 'Add Product'
    },
    'no-results': {
      icon: <Search className="h-12 w-12 text-gray-400" />,
      title: 'No Results Found',
      description: `No products match your search "${searchQuery}"`,
      actionLabel: 'Clear Search'
    }
  }[type];

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {config.icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {config.title}
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        {config.description}
      </p>
    </div>
  );
}