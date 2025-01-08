import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const HomePage = () => (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Financial Tools</h1>
      <p className="mb-8">Access powerful financial calculators to make informed decisions.</p>
      <Link 
        to="/cagr" 
        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        <Calculator className="h-5 w-5" />
        <span>Try CAGR Calculator</span>
      </Link>
    </div>
  );

export default HomePage