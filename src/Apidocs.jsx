import React, { useState } from 'react';
import { ChevronRight, Menu, X, Home, Key, User, Shield, Code, Book } from 'lucide-react';

const Apidocs = () => {
    const [activeSection, setActiveSection] = useState('introduction');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sidebarSections = [
        {
            id: 'introduction',
            title: 'Introduction',
            icon: <Home size={16} />,
            subsections: [
                { id: 'what-is-ayushsync', title: 'What is AyushSync?' },
                { id: 'getting-started', title: 'Getting Started' },
                { id: 'base-url', title: 'Base URL' }
            ]
        },
        {
            id: 'authentication',
            title: 'Authentication',
            icon: <Shield size={16} />,
            subsections: [
                { id: 'request-otp-registration', title: 'Request OTP for Registration' },
                { id: 'register-user', title: 'Register User' },
                { id: 'request-login-otp', title: 'Request Login OTP' },
                { id: 'get-token', title: 'Get Access Token' }
            ]
        },
        {
            id: 'user-management',
            title: 'User Management',
            icon: <User size={16} />,
            subsections: [
                { id: 'get-current-user', title: 'Get Current User' },
                { id: 'user-profile', title: 'User Profile Management' }
            ]
        },
        {
            id: 'api-endpoints',
            title: 'API Endpoints',
            icon: <Code size={16} />,
            subsections: [
                { id: 'root-endpoint', title: 'Root Endpoint' },
                { id: 'ayushsync-data', title: 'AyushSync Data' }
            ]
        },
        {
            id: 'examples',
            title: 'Code Examples',
            icon: <Book size={16} />,
            subsections: [
                { id: 'curl-examples', title: 'cURL Examples' },
                { id: 'javascript-examples', title: 'JavaScript Examples' }
            ]
        }
    ];

    const getCurrentPageSections = () => {
        switch (activeSection) {
            case 'introduction':
                return [
                    { id: 'overview', title: 'Overview' },
                    { id: 'features', title: 'Key Features' },
                    { id: 'workflow', title: 'API Workflow' }
                ];
            case 'request-otp-registration':
                return [
                    { id: 'endpoint-details', title: 'Endpoint Details' },
                    { id: 'request-body', title: 'Request Body' },
                    { id: 'response-examples', title: 'Response Examples' }
                ];
            case 'get-current-user':
                return [
                    { id: 'endpoint-details', title: 'Endpoint Details' },
                    { id: 'headers', title: 'Required Headers' },
                    { id: 'response-format', title: 'Response Format' }
                ];
            default:
                return [
                    { id: 'overview', title: 'Overview' },
                    { id: 'details', title: 'Details' },
                    { id: 'examples', title: 'Examples' }
                ];
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'introduction':
                return (
                    <div className="space-y-8">
                        <div id="overview">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">AyushSync API Documentation</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Welcome to the AyushSync API documentation. This API provides authentication and data access
                                for traditional medicine systems integration with modern healthcare platforms.
                            </p>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">Base URL</h3>
                                <code className="bg-blue-100 px-3 py-1 rounded text-blue-800">
                                    https://ayush-auth.vercel.app
                                </code>
                            </div>
                        </div>

                        <div id="features">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span><strong>ABHA ID Integration:</strong> Secure authentication using India's ABHA ID system</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span><strong>OTP-based Authentication:</strong> Two-factor authentication via SMS OTP</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span><strong>JWT Tokens:</strong> Secure API access using JSON Web Tokens</span>
                                </li>
                                <li className="flex items-start">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                    <span><strong>Protected Resources:</strong> Access control for sensitive healthcare data</span>
                                </li>
                            </ul>
                        </div>

                        <div id="workflow">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">API Workflow</h2>
                            <div className="grid gap-4">
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">1</div>
                                    <div>
                                        <h4 className="font-medium">Registration</h4>
                                        <p className="text-sm text-gray-600">Request OTP and register with ABHA ID</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">2</div>
                                    <div>
                                        <h4 className="font-medium">Authentication</h4>
                                        <p className="text-sm text-gray-600">Login with ABHA ID and OTP to get access token</p>
                                    </div>
                                </div>
                                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">3</div>
                                    <div>
                                        <h4 className="font-medium">Access Protected Resources</h4>
                                        <p className="text-sm text-gray-600">Use JWT token to access user data and AyushSync services</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'request-otp-registration':
                return (
                    <div className="space-y-8">
                        <div id="endpoint-details">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Request OTP for Registration</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Initiates the registration process by sending an OTP to the provided phone number.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Method</span>
                                        <p className="font-mono text-green-600 font-semibold">POST</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Path</span>
                                        <p className="font-mono">/request-otp</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Content-Type</span>
                                        <p className="font-mono">application/json</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="request-body">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Request Body</h2>
                            <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre className="text-green-400 text-sm overflow-x-auto">
                                    {`{
  "name": "John Doe",
  "phone_number": "9876543210",
  "abha_id": "john.doe@abha",
  "email": "john.doe@example.com"
}`}
                                </pre>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Field</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Type</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Required</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="px-4 py-2 font-mono text-sm">name</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Yes</td>
                                            <td className="px-4 py-2 text-sm">Full name of the user</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-sm">phone_number</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Yes</td>
                                            <td className="px-4 py-2 text-sm">10-digit phone number</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="px-4 py-2 font-mono text-sm">abha_id</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Yes</td>
                                            <td className="px-4 py-2 text-sm">Unique ABHA identifier</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-sm">email</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Yes</td>
                                            <td className="px-4 py-2 text-sm">Valid email address</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="response-examples">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Examples</h2>

                            <h3 className="text-lg font-medium text-gray-900 mb-2">Success Response</h3>
                            <div className="bg-gray-900 rounded-lg p-4 mb-6">
                                <pre className="text-green-400 text-sm">
                                    {`{
  "message": "OTP sent successfully"
}`}
                                </pre>
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 mb-2">Local Testing Response</h3>
                            <div className="bg-gray-900 rounded-lg p-4 mb-6">
                                <pre className="text-green-400 text-sm">
                                    {`{
  "message": "OTP generated (Twilio not configured)",
  "otp": "123456"
}`}
                                </pre>
                            </div>

                            <h3 className="text-lg font-medium text-gray-900 mb-2">cURL Example</h3>
                            <div className="bg-gray-900 rounded-lg p-4">
                                <pre className="text-blue-400 text-sm overflow-x-auto">
                                    {`curl -X POST "https://ayush-auth.vercel.app/request-otp" \\
     -H "Content-Type: application/json" \\
     -d '{
           "name": "John Doe",
           "phone_number": "9876543210",
           "abha_id": "john.doe@abha",
           "email": "john.doe@example.com"
         }'`}
                                </pre>
                            </div>
                        </div>
                    </div>
                );

            case 'get-current-user':
                return (
                    <div className="space-y-8">
                        <div id="endpoint-details">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Current User Information</h1>
                            <p className="text-lg text-gray-600 mb-6">
                                Retrieves information about the currently authenticated user. This is a protected endpoint that requires a valid JWT token.
                            </p>

                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Method</span>
                                        <p className="font-mono text-blue-600 font-semibold">GET</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Path</span>
                                        <p className="font-mono">/users/me</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Protection</span>
                                        <p className="text-red-600 font-semibold">🔒 Protected</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="headers">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Required Headers</h2>
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                <p className="text-yellow-800 text-sm mb-2">⚠️ This endpoint requires authentication</p>
                                <code className="bg-yellow-100 px-2 py-1 rounded text-yellow-800">
                                    Authorization: Bearer &lt;access_token&gt;
                                </code>
                            </div>

                            <div className="bg-gray-900 rounded-lg p-4 mb-4">
                                <pre className="text-blue-400 text-sm">
                                    {`curl -X GET "https://ayush-auth.vercel.app/users/me" \\
     -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."`}
                                </pre>
                            </div>
                        </div>

                        <div id="response-format">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Response Format</h2>

                            <h3 className="text-lg font-medium text-gray-900 mb-2">Success Response (200)</h3>
                            <div className="bg-gray-900 rounded-lg p-4 mb-6">
                                <pre className="text-green-400 text-sm">
                                    {`{
  "id": 1,
  "name": "John Doe",
  "phone_number": "9876543210",
  "abha_id": "john.doe@abha",
  "email": "john.doe@example.com",
  "ayush_sync_access": true
}`}
                                </pre>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-200 rounded-lg">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Field</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Type</th>
                                            <th className="px-4 py-2 text-left font-medium text-gray-900">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t">
                                            <td className="px-4 py-2 font-mono text-sm">id</td>
                                            <td className="px-4 py-2 text-sm">integer</td>
                                            <td className="px-4 py-2 text-sm">Unique user identifier</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-sm">name</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Full name of the user</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="px-4 py-2 font-mono text-sm">phone_number</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Registered phone number</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-sm">abha_id</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">ABHA identifier</td>
                                        </tr>
                                        <tr className="border-t">
                                            <td className="px-4 py-2 font-mono text-sm">email</td>
                                            <td className="px-4 py-2 text-sm">string</td>
                                            <td className="px-4 py-2 text-sm">Registered email address</td>
                                        </tr>
                                        <tr className="border-t bg-gray-50">
                                            <td className="px-4 py-2 font-mono text-sm">ayush_sync_access</td>
                                            <td className="px-4 py-2 text-sm">boolean</td>
                                            <td className="px-4 py-2 text-sm">Access status for AyushSync services</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            {sidebarSections.find(s => s.id === activeSection)?.title || 'Documentation'}
                        </h1>
                        <p className="text-gray-600">Content for this section is being developed. Please check back soon.</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
                            >
                                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                            <div className="flex items-center ml-2 lg:ml-0">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mr-3"></div>
                                <h1 className="text-xl font-bold text-gray-900">AyushSync Docs</h1>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center space-x-4">
                            <span className="text-sm text-gray-500">v1.0.0</span>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Left Sidebar */}
                <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative lg:flex flex-col w-64 bg-white border-r border-gray-200 h-screen lg:h-[calc(100vh-4rem)] overflow-y-auto z-30 transition-transform duration-300 ease-in-out`}>
                    <div className="p-4">
                        <nav className="space-y-2">
                            {sidebarSections.map((section) => (
                                <div key={section.id} className="space-y-1">
                                    <button
                                        onClick={() => {
                                            setActiveSection(section.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeSection === section.id || section.subsections?.some(sub => sub.id === activeSection)
                                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        {section.icon}
                                        <span className="ml-3">{section.title}</span>
                                    </button>

                                    {section.subsections && (activeSection === section.id || section.subsections.some(sub => sub.id === activeSection)) && (
                                        <div className="ml-6 space-y-1">
                                            {section.subsections.map((subsection) => (
                                                <button
                                                    key={subsection.id}
                                                    onClick={() => {
                                                        setActiveSection(subsection.id);
                                                        setIsSidebarOpen(false);
                                                    }}
                                                    className={`w-full text-left px-3 py-1 text-sm rounded-md transition-colors ${activeSection === subsection.id
                                                            ? 'bg-blue-50 text-blue-700'
                                                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {subsection.title}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-20"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 lg:flex">
                    <div className="flex-1 max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
                        {renderContent()}
                    </div>

                    {/* Right Sidebar - Table of Contents */}
                    <aside className="hidden xl:block w-64 p-6 bg-white border-l border-gray-200">
                        <div className="sticky top-8">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">On this page</h3>
                            <nav className="space-y-2">
                                {getCurrentPageSections().map((section) => (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        className="block text-sm text-gray-600 hover:text-gray-900 py-1 border-l-2 border-transparent hover:border-gray-300 pl-3 transition-colors"
                                    >
                                        {section.title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </aside>
                </main>
            </div>
        </div>
    );
};

export default Apidocs;