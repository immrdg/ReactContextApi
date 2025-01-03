import React, { useState, useRef } from 'react';
import { FileDown, ChevronDown } from 'lucide-react';

interface TableActionsProps {
  onExport: (exportAll: boolean) => void;
}

export default function TableActions({ onExport }: TableActionsProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center px-3 py-2 bg-white text-gray-700 rounded-md text-sm 
          font-medium hover:bg-gray-50 border border-gray-300"
        title="Export Options"
      >
        <FileDown className="h-4 w-4" />
        <span className="ml-2">Export</span>
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            <button
              onClick={() => {
                onExport(false);
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export Current Page
            </button>
            <button
              onClick={() => {
                onExport(true);
                setShowDropdown(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Export All Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}