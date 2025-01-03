# TechStore Product Management System - Technical Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Concepts](#core-concepts)
4. [Component Breakdown](#component-breakdown)
5. [Features Deep Dive](#features-deep-dive)
6. [Best Practices](#best-practices)

## Introduction

This document explains the TechStore product management system, a React application that helps manage product inventory. The system allows users to view, add, edit, and delete products, with features like search, pagination, and data export.

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/        # Reusable UI components
│   ├── export/       # Export-related components
│   └── form/         # Form-related components
├── context/          # React Context for state management
├── hooks/            # Custom React hooks
├── pages/            # Page components
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Core Concepts

### 1. React Context (State Management)
The `ProductContext` manages the global state of our application:
- Stores product data
- Handles loading states
- Manages pagination
- Handles search functionality

```typescript
// Example of how context is used
const { products, loading, error } = useProducts();
```

### 2. Custom Hooks
Custom hooks encapsulate reusable logic:

#### useClickOutside
```typescript
const dropdownRef = useClickOutside(() => setShowDropdown(false));
```
This hook detects clicks outside a component, useful for dropdowns and modals.

### 3. Component Architecture
Components are built following these principles:
- Single Responsibility
- Reusability
- Props for Configuration
- Clear Interface Definitions

## Component Breakdown

### 1. ProductsPage
The main page component that:
- Displays product list
- Handles search
- Manages pagination
- Coordinates export functionality

Key features:
```typescript
// Search functionality
const handleSearch = (query: string) => setSearchQuery(query);

// Export handling
const handleExport = (exportAll: boolean) => {
  const dataToExport = exportAll ? allProducts : products;
  // ... export logic
};
```

### 2. ExportMenu
A dropdown menu component for exporting data:
- Offers current page export
- Offers full data export
- Shows item counts
- Uses click-outside detection

### 3. ProductTable
Displays product data in a tabular format:
- Sortable columns
- Action buttons
- Responsive design

## Features Deep Dive

### 1. Search Implementation
```typescript
const filteredProducts = allProducts.filter(product =>
  product.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
);
```
- Case-insensitive search
- Real-time filtering
- Maintains original data integrity

### 2. Export Functionality
The export system uses multiple components:
1. `ExportMenu`: User interface
2. `ExportMenuItem`: Individual export options
3. `exportHelpers`: Utility functions for CSV generation

```typescript
// CSV Generation
export const generateCSV = (products: Product[]): string => {
  const headers = ['Product Name', 'Quantity in Stock', 'Price (USD)'];
  const rows = products.map(product => [/*...*/]);
  return [headers, ...rows].join('\n');
};
```

### 3. Pagination
Pagination is implemented with:
- Page size control
- Current page tracking
- Total pages calculation
- Navigation controls

## Best Practices

1. **Type Safety**
   - Use TypeScript interfaces for props
   - Define clear return types
   - Avoid any type

2. **Component Organization**
   - Small, focused components
   - Clear file structure
   - Logical grouping

3. **State Management**
   - Context for global state
   - Local state for UI
   - Derived state for calculations

4. **Error Handling**
   - Clear error messages
   - Loading states
   - Fallback UI

5. **Performance**
   - Memoization where needed
   - Efficient re-renders
   - Proper dependency management

## Conclusion

This project demonstrates modern React development practices with TypeScript, focusing on maintainability, scalability, and user experience. The modular architecture makes it easy to extend and modify features while maintaining code quality.