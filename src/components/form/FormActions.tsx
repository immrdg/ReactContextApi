import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  submitText: string;
}

export default function FormActions({ onCancel, isSubmitting, submitText }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onCancel}
        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
          border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Cancel
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 
          border border-transparent rounded-md shadow-sm hover:bg-blue-700 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Saving...
          </>
        ) : (
          submitText
        )}
      </button>
    </div>
  );
}