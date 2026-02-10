

//import React, { useState } from 'react';
import Link from 'next/link';
import SigninButtom from '../components/signinButton'

function AppBar() {
 //const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-slate-900 font-bold text-xl tracking-tight hidden sm:block">
                Modern<span className="text-blue-600">App</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/dashboard" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Profile
            </Link>
            <SigninButtom />
          </div>

          {/**
           * <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
           */}{/* Mobile Menu Button */}
          
        </div>
      </div>

      {/**
        {/* Mobile Menu Dropdown *
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <div className="pt-4 pb-2">
              <Link 
                href="/auth/signin"
                className="block w-full text-center bg-blue-600 text-white px-3 py-2 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
        */}
    </nav>
  );
}

export default AppBar;