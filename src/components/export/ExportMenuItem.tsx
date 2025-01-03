import React from 'react';

interface ExportMenuItemProps {
  onClick: () => void;
  label: string;
  description: string;
}

export default function ExportMenuItem({ onClick, label, description }: ExportMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
    >
      <div className="font-medium text-gray-700">{label}</div>
      <div className="text-xs text-gray-500 mt-0.5">{description}</div>
    </button>
  );
}