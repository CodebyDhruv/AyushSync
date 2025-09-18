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

// Improved API response handler
const handleApiResponse = async (response) => {
  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));

  const contentType = response.headers.get('content-type') || '';
  console.log('Content type:', contentType);

  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } else {
        const textContent = await response.text();
        console.log('Error response text:', textContent.substring(0, 200));
        if (textContent && textContent.trim()) {
          errorMessage = textContent.substring(0, 200);
        }
      }
    } catch (e) {
      console.warn('Failed to parse error response:', e);
    }

    throw new Error(errorMessage);
  }

  if (!contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Unexpected response type. Content-Type:', contentType);
    console.error('Response text preview:', text.substring(0, 200));
    throw new Error(`Expected JSON response but received: ${contentType}. Response preview: ${text.substring(0, 100)}`);
  }

  try {
    return await response.json();
  } catch (e) {
    const text = await response.text();
    console.error('JSON parse error. Response text:', text.substring(0, 200));
    throw new Error(`Invalid JSON response: ${e.message}`);
  }
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
      console.error('Search error:', err);
      setError(err.message || 'An error occurred while searching');
    } finally {
      setLoading(false);
    }
  };

  const performConditionSearch = async (term) => {
    console.log('Performing condition search for:', term);
    try {
      const url = `${API_BASE}/codesystem/search?query=${encodeURIComponent(term)}&limit=10`;
      console.log('Condition search URL:', url);

      const response = await fetch(url);
      const data = await handleApiResponse(response);

      console.log('Condition search response:', data);

      if (data && Array.isArray(data.results)) {
        setConditionResults(data.results);
      } else if (Array.isArray(data)) {
        setConditionResults(data);
      } else {
        console.error('Unexpected condition search response format:', data);
        throw new Error('Invalid response format for condition search - expected results array');
      }
    } catch (err) {
      console.error('Condition search error:', err);
      throw new Error(`Condition search failed: ${err.message}`);
    }
  };

  const performLookupSearch = async (term) => {
    console.log('Performing lookup search for:', term, 'in system:', selectedCodeSystem);
    const results = [];
    const systemUrl = CODE_SYSTEMS[selectedCodeSystem];

    try {
      const url = `${API_BASE}/codesystem/lookup?system=${encodeURIComponent(systemUrl)}&code=${encodeURIComponent(term)}`;
      console.log('Lookup search URL:', url);

      const response = await fetch(url);
      const data = await handleApiResponse(response);

      console.log('Lookup search response:', data);

      results.push({
        system: selectedCodeSystem,
        code: term,
        display: data.display,
        name: data.name,
        definition: data.definition
      });
    } catch (err) {
      console.error(`Error searching ${selectedCodeSystem}:`, err);
      throw new Error(`Lookup search failed: ${err.message}`);
    }

    setLookupResults(results);
  };

  const performIcdToTraditionalSearch = async (icdCode) => {
    console.log('Performing ICD to Traditional search for:', icdCode);
    try {
      const url = `${API_BASE}/conceptmaps/translate/icd/${encodeURIComponent(icdCode)}`;
      console.log('ICD to Traditional URL:', url);

      const response = await fetch(url);
      const data = await handleApiResponse(response);

      console.log('ICD to Traditional response:', data);

      if (Array.isArray(data)) {
        setSuggestions(data);
        if (data.length > 0) {
          setShowSuggestions(true);
        }
      } else {
        console.error('Unexpected ICD search response format:', data);
        throw new Error('Invalid response format - expected array');
      }
    } catch (err) {
      console.error('ICD search error:', err);
      throw new Error(`ICD to Traditional search failed: ${err.message}`);
    }
  };

  const performTraditionalToIcdSearch = async (traditionalCode) => {
    const fullCode = `${traditionalCodePrefix}:${traditionalCode}`;
    console.log('Performing Traditional to ICD search for:', fullCode);

    try {
      const url = `${API_BASE}/conceptmaps/translate/traditional/${encodeURIComponent(fullCode)}`;
      console.log('Traditional to ICD URL:', url);

      const response = await fetch(url);
      const data = await handleApiResponse(response);

      console.log('Traditional to ICD response:', data);

      if (Array.isArray(data)) {
        setIcdResults(data);
      } else {
        console.error('Unexpected Traditional search response format:', data);
        throw new Error('Invalid response format - expected array');
      }
    } catch (err) {
      console.error('Traditional search error:', err);
      throw new Error(`Traditional to ICD search failed: ${err.message}`);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    console.log('Handling suggestion click:', suggestion);

    const codeMatch = suggestion.traditionalCode.match(/^(NAMC|NUMC):(.+)$/);
    if (!codeMatch) {
      console.error('Invalid traditional code format:', suggestion.traditionalCode);
      return;
    }
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
      const url = `${API_BASE}/codesystem/lookup?system=${encodeURIComponent(systemUrl)}&code=${encodeURIComponent(code)}`;
      console.log('Suggestion lookup URL:', url);

      const response = await fetch(url);
      const data = await handleApiResponse(response);

      console.log('Suggestion lookup response:', data);

      setTraditionalResults([{
        display: data.display,
        name: data.name,
        definition: data.definition,
        originalSuggestion: suggestion
      }]);
      setShowSuggestions(false);
      setShowResults(true);
    } catch (err) {
      console.error('Suggestion lookup error:', err);
      setError(`Failed to lookup traditional code details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePopularSearch = (term) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  // Rest of your JSX remains exactly the same...
  return (
    <>
      <Navbar />
      <main className="relative flex-1 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 bg-gray-50 min-h-screen overflow-hidden">
        {/* All your existing JSX content here - no changes needed */}
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

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-2 text-gray-600 font-spline">Searching...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 font-spline">{error}</p>
            </div>
          )}

          {/* Rest of your existing JSX for results display... */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-spline">Select a Traditional Medicine Code:</h3>
              <div className="bg-white rounded-lg border border-gray-200 shadow-lg max-h-96 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <button key={index} onClick={() => handleSuggestionClick(suggestion)} className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                    <div className="font-semibold text-gray-900 font-spline">{suggestion.traditionalDisplay}</div>
                    <div className="text-sm text-gray-600 font-spline">{suggestion.traditionalCode}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Include all your existing results display JSX here... */}
          {/* The rest of your JSX component remains unchanged */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Search;