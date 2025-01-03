import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export default function ErrorMessage({ title = 'Error', message }: ErrorMessageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <div>
              <h2 className="text-lg font-semibold text-red-800">{title}</h2>
              <p className="mt-1 text-red-700">{message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}