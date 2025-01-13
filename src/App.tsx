import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation.tsx';
import AboutPage from './components/AboutPage.tsx';
import ProductsPage from './features/products/pages/ProductsPage.tsx';
import AddProductPage from './features/products/pages/AddProductPage.tsx';
import EditProductPage from './features/products/pages/EditProductPage.tsx';
import ProductDetailsPage from './features/products/pages/ProductDetailsPage.tsx';
import { ProductProvider } from './features/products/context/ProductContext.tsx';

function App() {
  return (
    <ProductProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navigation />
          <Routes>
            <Route path="/" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/add" element={<AddProductPage />} />
            <Route path="/products/edit/:id" element={<EditProductPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;