import { ShieldCheck, Truck, HeartHandshake } from 'lucide-react';
import React from 'react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About TechStore</h1>
        <p className="text-xl text-gray-600">Your Premier Destination for Premium Tech Products</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <img
            src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=1000"
            alt="Modern tech store"
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-gray-700 leading-relaxed">
            Welcome to TechStore, your premier destination for cutting-edge technology. 
            We offer a carefully curated selection of high-quality products designed to 
            enhance your digital lifestyle. Our commitment to excellence ensures that each 
            item in our catalog maintains the highest standards of quality and value.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Quality Guaranteed</h3>
                <p className="text-gray-600">All products are authentic and come with full warranty</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Truck className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Fast Delivery</h3>
                <p className="text-gray-600">Quick and secure shipping on all orders</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <HeartHandshake className="h-6 w-6 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Customer First</h3>
                <p className="text-gray-600">Dedicated support and hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}