import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer.jsx'
import About from './components/About.jsx'
import WhyChoose from './components/Whychoose.jsx'
import HowApi from './components/Howapi.jsx';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { useLocation, Link } from 'react-router-dom';

function App() {
  
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (location.state?.scrollToAbout) {
      const scrollAfterLoading = () => {
        if (!loading) {
          const timer = setTimeout(() => {
            const aboutSection = document.getElementById('about-section');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
            window.history.replaceState({}, document.title);
          }, 500);
          return () => clearTimeout(timer);
        } else {
          setTimeout(scrollAfterLoading, 100);
        }
      };
      scrollAfterLoading();
    }
  }, [location.state, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="scroll-smooth">
      <Navbar />


      <main className="relative w-screen left-0 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 overflow-hidden">
        <div className="absolute inset-0 w-screen h-screen bg-gradient-to-br from-green-50 via-white to-green-50"></div>
        <div className="absolute top-20 left-10 w-16 h-16 text-green-200 opacity-40 animate-bounce" style={{ animationDuration: '3s', animationDelay: '0s' }}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>

        <div className="absolute top-40 right-20 w-12 h-12 text-blue-200 opacity-40 animate-pulse" style={{ animationDuration: '2s', animationDelay: '1s' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>

        <div className="absolute top-60 left-1/4 w-14 h-14 text-green-300 opacity-40 animate-ping" style={{ animationDuration: '4s', animationDelay: '2s' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>

        <div className="absolute bottom-40 right-10 w-16 h-16 text-blue-300 opacity-40 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '3s' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>

        <div className="absolute bottom-20 left-1/3 w-12 h-12 text-green-200 opacity-40 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '1.5s' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="absolute top-1/3 right-1/4 w-10 h-10 text-blue-200 opacity-40 animate-ping" style={{ animationDuration: '5s', animationDelay: '4s' }}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </div>

        <div className="absolute top-32 right-1/3 w-8 h-8 border-2 border-green-200 rounded-full opacity-20 animate-ping" style={{ animationDuration: '6s', animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-6 h-6 border-2 border-blue-200 rounded-full opacity-25 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-4 h-4 bg-green-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s', animationDelay: '3.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-5 h-5 bg-blue-300 rounded-full opacity-25 animate-ping" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
            `,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">


          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight font-spline">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent relative">
              AyushSync

            </span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-700 mb-6 leading-relaxed font-spline">
            Bridging India's traditional medicine with global healthcare standards
          </p>

          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-spline">
            Search, map, and dual-code AYUSH and ICD-11 diagnoses securely and effortlessly.
            Transform your healthcare data management with our intelligent terminology mapping platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/login">
              <button className="group bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-spline">
                <span className="flex items-center">
                  Get Started
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </Link>

            <button
              onClick={() => {
                const whyChooseSection = document.getElementById('why-choose-section');
                if (whyChooseSection) {
                  whyChooseSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group border-2 border-green-600 text-green-600 px-8 py-4 text-lg font-semibold rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 hover:scale-105 hover:-translate-y-1 font-spline"
            >
              <span className="flex items-center">
                Learn More
                <svg className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </button>
          </div>

        </div>
      </main>

      <WhyChoose />
      <HowApi />

      <div>
        <About />
      </div>

      <Footer />
    </div>
  );
}


export default App
