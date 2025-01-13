import React from 'react';
import { FileDown, ChevronDown } from 'lucide-react';
import ExportMenuItem from './ExportMenuItem.tsx';
import { useClickOutside } from '../../hooks/useClickOutside.ts';

interface ExportMenuProps {
  onExport: (exportAll: boolean) => void;
  totalItems: number;
  currentPageItems: number;
}

export default function ExportMenu({ onExport, totalItems, currentPageItems }: ExportMenuProps) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setShowDropdown(false));

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
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200 divide-y divide-gray-100">
          <ExportMenuItem
            onClick={() => {
              onExport(false);
              setShowDropdown(false);
            }}
            label={`Export Current Page (${currentPageItems} items)`}
            description="Download data from the current page view"
          />
          <ExportMenuItem
            onClick={() => {
              onExport(true);
              setShowDropdown(false);
            }}
            label={`Export All Data (${totalItems} items)`}
            description="Download complete product catalog"
          />
        </div>
      )}
    </div>
  );
}