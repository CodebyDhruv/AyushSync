import { React, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

const API_BASE = '/api';

const CODE_SYSTEMS = {
  ayurveda: 'http://namaste.ayush.gov.in/fhir/CodeSystem/ayurveda-medicine-codes',
  siddha: 'http://namaste.ayush.gov.in/fhir/CodeSystem/siddha-medicine-codes',
  unani: 'http://namaste.ayush.gov.in/fhir/CodeSystem/unani-medicine-codes'
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMode, setSearchMode] = useState('lookup');
  const [selectedCodeSystem, setSelectedCodeSystem] = useState('ayurveda');
  const [traditionalCodePrefix, setTraditionalCodePrefix] = useState('NAMC');
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [lookupResults, setLookupResults] = useState([]);
  const [traditionalResults, setTraditionalResults] = useState([]);
  const [icdResults, setIcdResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [conditionResults, setConditionResults] = useState([]);

  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    setShowSuggestions(false);
    setSuggestions([]);
    setLookupResults([]);
    setTraditionalResults([]);
    setIcdResults([]);
    setConditionResults([]);
    setError('');
  };

  const handleModeChange = (newMode) => {
    setSearchMode(newMode);
    clearSearch();
  };

  const handleSearch = async (term = searchTerm) => {
    if (!term.trim()) return;
    setLoading(true);
    setError('');
    setShowResults(false);
    setShowSuggestions(false);
    setSuggestions([]);
    setLookupResults([]);
    setTraditionalResults([]);
    setIcdResults([]);
    setConditionResults([]);

    try {
      switch (searchMode) {
        case 'lookup':
          await performLookupSearch(term);
          break;
        case 'condition-search':
          await performConditionSearch(term);
          break;
        case 'icd-to-traditional':
          await performIcdToTraditionalSearch(term);
          break;
        case 'traditional-to-icd':
          await performTraditionalToIcdSearch(term);
          break;
      }
      setShowResults(true);
    } catch (err) {
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const performConditionSearch = async (term) => {
    try {
      const response = await fetch(`${API_BASE}/codesystem/search?query=${encodeURIComponent(term)}&limit=10`);
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error message');
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (data && Array.isArray(data.results)) {
        setConditionResults(data.results);
      } else {
        throw new Error('Invalid response format for condition search');
      }
    } catch (err) {
      console.error('Condition search error:', err);
      throw err;
    }
  };

  const performLookupSearch = async (term) => {
    const results = [];
    const systemUrl = CODE_SYSTEMS[selectedCodeSystem];
    try {
      const response = await fetch(`${API_BASE}/codesystem/lookup?system=${encodeURIComponent(systemUrl)}&code=${encodeURIComponent(term)}`);
      if (response.ok) {
        const data = await response.json();
        results.push({
          system: selectedCodeSystem,
          code: term,
          display: data.display,
          name: data.name,
          definition: data.definition
        });
      } else {
        const errorText = await response.text();
        throw new Error(`API returned ${response.status}: ${errorText}`);
      }
    } catch (err) {
      console.error(`Error searching ${selectedCodeSystem}:`, err);
      throw err;
    }
    setLookupResults(results);
  };

  const performIcdToTraditionalSearch = async (icdCode) => {
    try {
      const response = await fetch(`${API_BASE}/conceptmaps/translate/icd/${encodeURIComponent(icdCode)}`);
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error message');
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
        if (data.length > 0) {
          setShowSuggestions(true);
        }
      } else {
        throw new Error('Invalid response format: expected array');
      }
    } catch (err) {
      console.error('ICD search error:', err);
      throw err;
    }
  };

  const performTraditionalToIcdSearch = async (traditionalCode) => {
    const fullCode = `${traditionalCodePrefix}:${traditionalCode}`;
    try {
      const response = await fetch(`${API_BASE}/conceptmaps/translate/traditional/${encodeURIComponent(fullCode)}`);
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unable to read error message');
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setIcdResults(data);
      } else {
        throw new Error('Invalid response format: expected array');
      }
    } catch (err) {
      console.error('Traditional search error:', err);
      throw err;
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const codeMatch = suggestion.traditionalCode.match(/^(NAMC|NUMC):(.+)$/);
    if (!codeMatch) return;
    const code = codeMatch[2];

    const displayLower = suggestion.traditionalDisplay.toLowerCase();
    let systemUrl;
    if (displayLower.includes('siddha')) {
      systemUrl = CODE_SYSTEMS.siddha;
    } else if (displayLower.includes('unani')) {
      systemUrl = CODE_SYSTEMS.unani;
    } else {
      systemUrl = CODE_SYSTEMS.ayurveda;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/codesystem/lookup?system=${encodeURIComponent(systemUrl)}&code=${encodeURIComponent(code)}`);
      if (response.ok) {
        const data = await response.json();
        setTraditionalResults([{
          display: data.display,
          name: data.name,
          definition: data.definition,
          originalSuggestion: suggestion
        }]);
        setShowSuggestions(false);
        setShowResults(true);
      }
    } catch (err) {
      setError('Failed to lookup traditional code details');
    } finally {
      setLoading(false);
    }
  };

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 bg-gray-50 min-h-screen overflow-hidden">
        <div className="absolute top-32 right-1/3 w-6 h-6 border-2 border-green-200 rounded-full opacity-20 animate-ping" style={{ animationDuration: '6s', animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 border-2 border-blue-200 rounded-full opacity-25 animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-green-300 rounded-full opacity-20 animate-bounce" style={{ animationDuration: '3s', animationDelay: '3.5s' }}></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>

        <div className="relative z-10 mx-auto max-w-6xl pt-16 sm:pt-20">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <button onClick={() => handleModeChange('lookup')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-spline ${searchMode === 'lookup' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                Code Lookup
              </button>
              <button onClick={() => handleModeChange('condition-search')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-spline ${searchMode === 'condition-search' ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                Condition to Code
              </button>
              <button onClick={() => handleModeChange('icd-to-traditional')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-spline ${searchMode === 'icd-to-traditional' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                ICD to Traditional
              </button>
              <button onClick={() => handleModeChange('traditional-to-icd')} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors font-spline ${searchMode === 'traditional-to-icd' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}>
                Traditional to ICD
              </button>
            </div>
          </div>

          {searchMode === 'lookup' && (
            <div className="mb-4 flex justify-center">
              <select value={selectedCodeSystem} onChange={(e) => setSelectedCodeSystem(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-spline">
                <option value="ayurveda">Ayurveda</option>
                <option value="siddha">Siddha</option>
                <option value="unani">Unani</option>
              </select>
            </div>
          )}
          {searchMode === 'traditional-to-icd' && (
            <div className="mb-4 flex justify-center">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input type="radio" value="NAMC" checked={traditionalCodePrefix === 'NAMC'} onChange={(e) => setTraditionalCodePrefix(e.target.value)} className="mr-2" />
                  <span className="text-gray-700 font-spline">NAMC</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" value="NUMC" checked={traditionalCodePrefix === 'NUMC'} onChange={(e) => setTraditionalCodePrefix(e.target.value)} className="mr-2" />
                  <span className="text-gray-700 font-spline">NUMC</span>
                </label>
              </div>
            </div>
          )}

          <div className="relative mb-8">
            <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="form-input w-full rounded-full border-2 border-gray-300 bg-white p-3 sm:p-4 pl-12 sm:pl-14 pr-10 sm:pr-12 text-base sm:text-lg text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-0 font-spline"
              placeholder={
                searchMode === 'lookup' ? `Search for a ${selectedCodeSystem} code...` :
                  searchMode === 'condition-search' ? 'Enter a condition or symptom...' :
                    searchMode === 'icd-to-traditional' ? 'Enter ICD-11 code...' :
                      'Enter traditional medicine code...'
              }
              disabled={loading}
            />
            {searchTerm && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800" aria-label="Clear search">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {loading && (<div className="text-center py-8"> <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div> <p className="mt-2 text-gray-600 font-spline">Searching...</p> </div>)}
          {error && (<div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"> <p className="text-red-800 font-spline">{error}</p> </div>)}
          {showSuggestions && suggestions.length > 0 && (<div className="mb-8"> <h3 className="text-xl font-bold text-gray-900 mb-4 font-spline">Select a Traditional Medicine Code:</h3> <div className="bg-white rounded-lg border border-gray-200 shadow-lg max-h-96 overflow-y-auto"> {suggestions.map((suggestion, index) => (<button key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"> <div className="font-semibold text-gray-900 font-spline">{suggestion.traditionalDisplay}</div> <div className="text-sm text-gray-600 font-spline">{suggestion.traditionalCode}</div> </button>))} </div> </div>)}

          {showResults && (
            <div className="space-y-8 sm:space-y-12">
              {conditionResults.length > 0 && (
                <div>
                  <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight mb-6 font-spline">Condition Search Results</h2>
                  <div className="grid gap-6">
                    {conditionResults.map((result, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900 font-spline">
                            {result.display}
                          </h3>
                          <span className="flex-shrink-0 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium font-spline">
                            {result.code}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 capitalize mb-4">{result.category}</p>
                        <p className="text-gray-700 font-spline">{result.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lookupResults.length > 0 && (
                <div>
                  <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight mb-6 font-spline">NAMASTE Code Lookup Results</h2>
                  <div className="grid gap-6">
                    {lookupResults.map((result, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-gray-900 font-spline capitalize">{result.system}</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium font-spline">
                            {result.code || searchTerm}
                          </span>
                        </div>
                        <p className="text-gray-700 font-spline">{result.display || result.name || 'No description available'}</p>
                        {result.definition && (<p className="text-sm text-gray-600 mt-2 font-spline">{result.definition}</p>)}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {traditionalResults.length > 0 && (
                <div>
                  <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight mb-6 font-spline">Traditional Medicine Details</h2>
                  {traditionalResults.map((result, index) => (
                    <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-gray-900 font-spline">{result.originalSuggestion.traditionalDisplay}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium font-spline">
                          {result.originalSuggestion.traditionalCode}
                        </span>
                      </div>
                      <p className="text-gray-700 font-spline">{result.display || result.name || 'No description available'}</p>
                      {result.definition && (<p className="text-sm text-gray-600 mt-2 font-spline">{result.definition}</p>)}
                    </div>
                  ))}
                </div>
              )}

              {icdResults.length > 0 && (
                <div>
                  <h2 className="text-gray-900 text-2xl sm:text-3xl font-bold tracking-tight mb-6 font-spline">ICD Code Results</h2>
                  <div className="grid gap-4">
                    {icdResults.map((result, index) => (
                      <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-gray-900 font-spline">{result.icdCode}</h3>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium font-spline">
                            ICD-11
                          </span>
                        </div>
                        <p className="text-gray-700 font-spline">{result.icdDisplay}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {lookupResults.length === 0 && traditionalResults.length === 0 && icdResults.length === 0 && suggestions.length === 0 && conditionResults.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600 font-spline">No results found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          )}

          {!showResults && !showSuggestions && !loading && (
            <>
              <div className="w-full">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 font-spline mb-4 sm:mb-6 text-center">Popular Searches</h3>
                <div className="flex gap-2 sm:gap-3 justify-center flex-wrap">
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("SK00")}>SK00</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("AAB")}>AAB</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("RI")}>RI</button>
                  <button className="flex h-8 sm:h-10 items-center justify-center rounded-full bg-green-100 text-green-800 px-3 sm:px-5 text-xs sm:text-sm font-medium hover:bg-green-200 transition-colors font-spline"
                    onClick={() => handlePopularSearch("A-36")}>A-36</button>
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