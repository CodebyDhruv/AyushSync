import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleAboutUsClick = () => {
    if (location.pathname === '/') {
      const aboutSection = document.getElementById('about-section');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToAbout: true } });
    }
  };

  return (
    <div className='flex flex-col w-full bg-[#F8FBF9] text-[#6B7280] font-inter'>
      <div className="container mx-auto flex flex-col sm:flex-row w-full px-4 sm:px-8 lg:px-20 justify-between items-start pt-15 pb-8 gap-8 sm:gap-4">
        <div className="info flex flex-col gap-5 w-full sm:w-auto">
          <h3 className="text-lg font-semibold text-gray-800">AyushSync</h3>
          <div className="content flex flex-col gap-1">
            <h2 className="mt-4 text-sm sm:text-md">Simplifying healthcare technology mapping.</h2>
          </div>
        </div>
        <div className="company flex flex-col gap-5 w-full sm:w-auto">
          <h3 className="text-base font-semibold text-gray-800">Company</h3>
          <div className="content flex flex-col gap-1">
            <button onClick={handleAboutUsClick} className="hover:underline text-sm sm:text-base text-left">About Us</button>
            <Link to="/contact" className="hover:underline text-sm sm:text-base">Contact Us</Link>
          </div>
        </div>
        <div className="resources flex flex-col gap-5 w-full sm:w-auto">
          <h3 className="text-base font-semibold text-gray-800">Resources</h3>
          <div className="content flex flex-col gap-1">
            <Link className="text-sm hover:text-[var(--primary-color)] transition-colors hover:underline" to="/blog">Blog</Link>
            <Link className="text-sm hover:text-[var(--primary-color)] transition-colors hover:underline" to="/documentation">Documentation</Link>
          </div>
        </div>
        <div className="legal flex flex-col gap-5 w-full sm:w-auto">
          <h3 className="text-base font-semibold text-gray-800">Legal</h3>
          <div className="content flex flex-col gap-1">
            <Link className="text-sm hover:text-[var(--primary-color)] transition-colors hover:underline" to="/privacy_policy">Privacy Policy</Link>
            <Link className="text-sm hover:text-[var(--primary-color)] transition-colors hover:underline" to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-8 lg:mx-20 border-t border-gray-200 opacity-50"></div>

      <div className='flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 lg:px-20 py-6 gap-4 sm:gap-0'>
        <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
          © 2025 AyushSync. All rights reserved.
        </p>
        <div className="flex space-x-4 sm:space-x-6">
          <Link className="text-gray-500 hover:text-[var(--primary-color)] transition-colors" to="/facebook">
            <span className="sr-only">Facebook</span>
            <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fillRule="evenodd"></path>
            </svg>
          </Link>
          <Link className="text-gray-500 hover:text-[var(--primary-color)] transition-colors" to="/twitter">
            <span className="sr-only">Twitter</span>
            <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </Link>
          <Link className="text-gray-500 hover:text-[var(--primary-color)] transition-colors" to="/linkedin">
            <span className="sr-only">LinkedIn</span>
            <svg aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
              <path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer