import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

const namaResults = [
  { code: 'NMS001', desc: 'Common Cold' },
  { code: 'NMS002', desc: 'Influenza' },
  { code: 'NMS003', desc: 'Pneumonia' },
  { code: 'NMS004', desc: 'Bronchitis' },
  { code: 'NMS005', desc: 'Asthma' }
];

const icdResults = [
  { code: 'AA00.0', desc: 'Common Cold' },
  { code: 'AB01.2', desc: 'Influenza' },
  { code: 'CD34.5', desc: 'Pneumonia' },
  { code: 'EF67.8', desc: 'Bronchitis' },
  { code: 'GH90.1', desc: 'Asthma' }
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (term = searchTerm) => {
    setSearchTerm(term);
    setShowResults(true);
  };

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 bg-gray-50 min-h-screen overflow-hidden">
        <div className="absolute top-32 right-1/3 w-6 h-6 border-2 border-green-200 rounded-full opacity-20 animate-ping" style={{ animationDuration: '6s', animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 border-2 border-blue-200 rounded-full opacity-25 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-green-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s', animationDelay: '3.5s' }}></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="relative z-10 mx-auto max-w-6xl pt-16 sm:pt-20">
          <div className="relative mb-8">
            <svg
              className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="form-input w-full rounded-full border-2 border-gray-300 bg-white p-3 sm:p-4 pl-12 sm:pl-14 pr-10 sm:pr-12 text-base sm:text-lg text-gray-900 placeholder-gray-500 focus:border-[var(--primary-color)] focus:outline-none focus:ring-0 font-spline"
              placeholder="Search for a condition or code..."
            />
            {!!searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                aria-label="Clear search"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>


          {showResults ? (
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight mb-6 font-spline">NAMASTE Code Results</h2>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px]">
                      <thead className="bg-gradient-to-r from-green-50 to-emerald-50">
                        <tr>
                          <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">NAMASTE Code</th>
                          <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-700">Description</th>
                          <th className="relative px-4 sm:px-6 py-4"><span className="sr-only">Select</span></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {namaResults.map(res => (
                          <tr key={res.code} className="hover:bg-green-50 transition-colors">
                            <td className="px-4 sm:px-6 py-4 text-base font-semibold text-gray-900 font-spline">{res.code}</td>
                            <td className="px-4 sm:px-6 py-4 text-base text-gray-700 font-spline">{res.desc}</td>
                            <td className="px-4 sm:px-6 py-4 text-right text-base font-medium">
                              <Link className="text-green-600 hover:text-green-800 font-semibold transition-colors font-spline" href="#">View Mapping</Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight mb-6 font-spline">ICD-11 Code Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {icdResults.map(res => (
                    <div key={res.code} className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-lg transition-all hover:border-blue-500 hover:shadow-xl hover:-translate-y-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 font-spline">{res.code}</h3>
                      <p className="text-base text-gray-700 leading-relaxed font-spline">{res.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>

              <div className="w-full">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 font-spline mb-4 sm:mb-6 text-center">Popular Searches</h3>
                <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("Diabetes")}>Diabetes</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("Hypertension")}>Hypertension</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("Influenza")}>Influenza</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("Arthritis")}>Arthritis</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("Migraine")}>Migraine</button>
                </div>
              </div>
              <div className="w-full mt-12 sm:mt-16 lg:mt-20 max-w-6xl mx-auto px-2 sm:px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 p-4 sm:p-6 lg:p-8 min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] rounded-xl shadow-lg flex flex-col items-center transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -translate-y-10 translate-x-10 opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-100 rounded-full translate-y-8 -translate-x-8 opacity-40"></div>

                    <div className="relative z-10 w-full">
                      <div className="text-center mb-4">
                        <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3 font-spline">
                          Traditional Medicine
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-xl font-bold tracking-tight text-green-700 font-spline mb-4 sm:mb-6">NAMASTE</h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 text-center flex-grow leading-relaxed font-spline">
                        NAMASTE provides a standardized way to represent traditional medical concepts, bridging the gap between ancient wisdom and modern healthcare data.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                          <span>Consistent terminology for Ayurveda, Yoga, and Siddha</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                          <span>Integration with electronic medical records</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                          <span>Supports research and analytics</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 p-4 sm:p-6 lg:p-8 min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] rounded-xl shadow-lg flex flex-col items-center transition-all duration-300 ease-in-out hover:border-blue-400 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
                    <div className="absolute top-0 left-0 w-24 h-24 bg-blue-100 rounded-full -translate-y-12 -translate-x-12 opacity-25"></div>
                    <div className="absolute bottom-0 right-0 w-18 h-18 bg-indigo-100 rounded-full translate-y-9 translate-x-9 opacity-35"></div>

                    <div className="relative z-10 w-full">
                      <div className="text-center mb-4">
                        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mb-3 font-spline">
                          Global Standard
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-xl font-bold tracking-tight text-blue-700 font-spline mb-4 sm:mb-6">ICD-11</h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 text-center flex-grow leading-relaxed font-spline">
                        The International Classification of Diseases, 11th Revision, is the global standard for diagnostic health information, essential for statistics and billing.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>World Health Organization standard</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Supports thousands of disease codes</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span>Links to public health databases</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 p-4 sm:p-6 lg:p-8 min-h-[18rem] sm:min-h-[20rem] lg:min-h-[22rem] rounded-xl shadow-lg flex flex-col items-center transition-all duration-300 ease-in-out hover:border-purple-400 hover:shadow-2xl hover:-translate-y-2 group overflow-hidden">
                    <div className="absolute top-0 right-0 w-22 h-22 bg-purple-100 rounded-full -translate-y-11 translate-x-11 opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-violet-100 rounded-full translate-y-10 -translate-x-10 opacity-40"></div>

                    <div className="relative z-10 w-full">
                      <div className="text-center mb-4">
                        <div className="inline-block px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold mb-3 font-spline">
                          Interoperability
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-xl font-bold tracking-tight text-purple-700 font-spline mb-4 sm:mb-6">FHIR</h3>
                      </div>
                      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 text-center flex-grow leading-relaxed font-spline">
                        Fast Healthcare Interoperability Resources is a next-generation standards framework for exchanging healthcare information electronically.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span>Restful API support for health apps</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span>Real-time data exchange</span>
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 font-spline">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                          <span>Widely used by hospitals and clinics</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Search;
