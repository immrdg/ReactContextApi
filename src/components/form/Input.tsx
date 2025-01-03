import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function Input({ icon, className = '', ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {icon}
        </div>
      )}
      <input
        {...props}
        className={`
          block w-full px-4 py-2.5 text-gray-900 bg-white rounded-lg
          border border-gray-300 
          ${icon ? 'pl-10' : 'pl-4'}
          placeholder:text-gray-400
          transition-all duration-200
          hover:border-gray-400
          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${props.type === 'number' ? '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}
          ${className}
        `}
      />
    </div>
  );
}