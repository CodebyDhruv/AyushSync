import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cardiogram from '../assets/cardiogram.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const pages = [
    { name: "Home", path: "/" },
    { name: "Search", path: "/search" },
    { name: "Problem List Builder", path: "/problem_list" },
    { name: "Upload", path: "/upload" },
    { name: "Audit Logs", path: "/audit" },
    { name: "API Docs", path: "/apidocs" },
  ];

  return (
    <>
      <div className="fixed top-0 w-screen flex items-center justify-between border-b-2 border-b-gray-200 shadow-sm bg-white z-50 px-4 sm:px-6 lg:px-8 font-spline">
        <Link to="/">
          <div className="logo flex flex-row gap-2 sm:gap-3 justify-center items-center">
            <img className="h-8 sm:h-10 w-fit" src={cardiogram} title="medical icons" alt="" />
            <h1 className="font-bold text-lg sm:text-xl font-spline">AyushSync</h1>
          </div>
        </Link>

        <div className="hidden md:flex mx-auto justify-center space-x-6 lg:space-x-10">
          {pages.map((page) => {
            const isActive = location.pathname === page.path;
            return (
              <div key={page.name} className="relative group">
                <Link
                  to={page.path}
                  className={`text-sm lg:text-md font-semibold transition-colors hover:text-[var(--primary-color)] ${isActive ? "text-[var(--primary-color)]" : "text-gray-500"
                    }`}
                >
                  {page.name}
                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-[var(--primary-color)] rounded-full origin-left transition-all duration-300 ease-in-out ${isActive ? "w-full" : "w-0 group-hover:w-full underline-animate"
                      }`}
                  ></span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className="hidden md:block">
          <div className="relative group">
            <button
              className="flex items-center gap-1 rounded-full bg-gray-100 py-2 px-3 text-xs lg:text-md font-medium hover:bg-gray-200 transition-colors"
              onMouseEnter={() => setIsAuthDropdownOpen(true)}
              onMouseLeave={() => setIsAuthDropdownOpen(false)}
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <svg
                className={`w-3 h-3 lg:w-4 lg:h-4 text-gray-500 transition-transform duration-200 ${isAuthDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div
              className={`absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden transition-all duration-200 ${isAuthDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
              onMouseEnter={() => setIsAuthDropdownOpen(true)}
              onMouseLeave={() => setIsAuthDropdownOpen(false)}
            >
              <div className="py-1">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-color)] transition-colors duration-150"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--primary-color)] transition-colors duration-150"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-3">
          {pages.map((page) => {
            const isActive = location.pathname === page.path;
            return (
              <Link
                key={page.name}
                to={page.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-semibold px-3 py-2 rounded-md ${isActive ? "text-[var(--primary-color)]" : "text-gray-700 hover:text-[var(--primary-color)]"
                  }`}
              >
                {page.name}
              </Link>
            );
          })}

          <div className="border-t border-gray-200 pt-3 mt-3">
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 font-semibold hover:text-[var(--primary-color)] rounded-md"
            >
              Login
            </Link>
            <Link
              to="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 font-semibold hover:text-[var(--primary-color)] rounded-md"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;