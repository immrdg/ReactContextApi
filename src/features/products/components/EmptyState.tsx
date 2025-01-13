import React from 'react';
import { PackageX, Plus, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  type: 'no-products' | 'no-results';
  searchQuery?: string;
}

export default function EmptyState({ type, searchQuery }: EmptyStateProps) {
    const navigate = useNavigate();

    const config = {
        'no-products': {
            icon: <PackageX className="h-12 w-12 text-gray-400" />,
            title: 'No Products Available',
            description: 'Start by adding your first product to the inventory.',
            action: {
                label: 'Add Product',
                  onClick: () => navigate('/products/add'),
                  icon: <Plus className="h-4 w-4 mr-2" />
            }
        },
        'no-results': {
            icon: <XCircle className="h-12 w-12 text-gray-400" />,
            title: 'Invalid Search',
            description: `No products found matching "${searchQuery}". Please try a different search term.`,
            action: null
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
            {config.action && (
                <button
                    onClick={config.action.onClick}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {config.action.icon}
                    {config.action.label}
                </button>
            )}
        </div>
    );
}