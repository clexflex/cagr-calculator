import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Menu, X, Linkedin, Github, Globe } from 'lucide-react';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <Calculator className="h-6 w-6" />
              <span className="font-bold text-xl">Financial Tools</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="hover:text-blue-200 px-3 py-2">Home</Link>
              <Link to="/cagr" className="hover:text-blue-200 px-3 py-2">CAGR Calculator</Link>
              
              <a 
                href="https://www.linkedin.com/in/yashrajghosalkar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 px-3 py-2"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              
              <a 
                href="https://github.com/clexflex/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 px-3 py-2"
              >
                <Github className="h-5 w-5" />
              </a>
              
              <a 
                href="https://drive.google.com/file/d/1z__OPFr6QBEDA3_bDS7Hmv25mYplCCcv/view?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-200 px-3 py-2"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <Link to="/" className="block px-3 py-2 hover:bg-blue-700">Home</Link>
              <Link to="/cagr" className="block px-3 py-2 hover:bg-blue-700">CAGR Calculator</Link>
              <div className="flex space-x-4 px-3 py-2">
                <a 
                  href="https://www.linkedin.com/in/yashrajghosalkar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-200"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/clexflex/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-200"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://drive.google.com/file/d/1z__OPFr6QBEDA3_bDS7Hmv25mYplCCcv/view?usp=sharing" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-200"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 ClexFlex. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;