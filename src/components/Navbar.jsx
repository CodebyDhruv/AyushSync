import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import cardiogram from '../assets/cardiogram.png';
import axios from 'axios';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const abhaId = localStorage.getItem('abhaId');
      if (token) {
        try {
          const response = await axios.get('https://ayush-auth.vercel.app/users/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUser({ ...response.data, abhaId });
        } catch (err) {
          console.error('Fetch User Data Error in Navbar:', err);
        }
      }
    };

    fetchUserData();
  }, []);

  // Auth state is now derived directly from localStorage
  const token = localStorage.getItem('authToken');
  const abhaId = localStorage.getItem('abhaId');

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('abhaId');
    navigate("/login");
    setIsMobileMenuOpen(false);
    window.location.reload();
  };

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
          {token ? (
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 rounded-full bg-gray-100 py-2 lg:py-3 px-3 lg:px-5 text-xs lg:text-sm font-medium hover:bg-gray-200 transition-all duration-200 hover:shadow-md">
                <span className="text-gray-700 hidden lg:inline">{user ? user.name : 'Welcome'}</span>
                <svg
                  className={`w-3 h-3 lg:w-4 lg:h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`absolute right-0 mt-0 w-48 lg:w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden ${isDropdownOpen ? 'block' : 'hidden'}`}>
                <div className="py-2">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user ? user.name : 'Logged in'}</p>
                    <p className="text-xs text-gray-500 mt-1">{user ? user.email : abhaId}</p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">ABHA ID</p>
                    <p className="text-xs text-gray-500 mt-1">{user ? user.abhaId : ''}</p>
                  </div>
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700">Phone Number</p>
                    <p className="text-xs text-gray-500 mt-1">{user ? user.phone_number : ''}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-colors duration-150 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/login">
              <button className="flex items-center rounded-full bg-gray-100 py-2 px-3 lg:px-4 text-xs lg:text-md font-medium hover:bg-gray-200 transition-colors">
                <h3 className="font-spline text-xs lg:text-sm"> Log In / Sign Up </h3>
              </button>
            </Link>
          )}
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

          {token ? (
            <button
              onClick={handleSignOut}
              className="text-left px-3 py-2 text-red-600 font-semibold hover:bg-gray-100 rounded-md"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-left px-3 py-2 text-gray-700 font-semibold hover:text-[var(--primary-color)] rounded-md"
            >
              Log In / Sign Up
            </Link>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
