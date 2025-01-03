import React from 'react';
import { FileDown } from 'lucide-react';

interface TableActionsProps {
  onExport: () => void;
}

export default function TableActions({ onExport }: TableActionsProps) {
  return (
    <button
      onClick={onExport}
      className="flex items-center px-3 py-2 bg-white text-gray-700 rounded-md text-sm 
        font-medium hover:bg-gray-50 border border-gray-300"
      title="Export Data"
    >
      <FileDown className="h-4 w-4" />
      <span className="ml-2">Export</span>
    </button>
  );
}