import React, { useState, useRef } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Upload = () => {
    const [file, setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [recentUploads, setRecentUploads] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === 'text/csv' || selectedFile.name.toLowerCase().endsWith('.csv')) {
                setFile(selectedFile);
                setUploadSuccess(true);
                setUploadError(false);

                const newUpload = {
                    id: Date.now(),
                    fileName: selectedFile.name,
                    uploadDate: new Date().toLocaleString(),
                    status: 'Success',
                    action: 'View'
                };
                setRecentUploads(prev => [newUpload, ...prev.slice(0, 4)]);

                setTimeout(() => {
                    setUploadSuccess(false);
                }, 5000);
            } else {
                setUploadError(true);
                setUploadSuccess(false);

                setTimeout(() => {
                    setUploadError(false);
                }, 5000);
            }
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.type === 'text/csv' || droppedFile.name.toLowerCase().endsWith('.csv')) {
                setFile(droppedFile);
                setUploadSuccess(true);
                setUploadError(false);

                const newUpload = {
                    id: Date.now(),
                    fileName: droppedFile.name,
                    uploadDate: new Date().toLocaleString(),
                    status: 'Success',
                    action: 'View'
                };
                setRecentUploads(prev => [newUpload, ...prev.slice(0, 4)]);

                setTimeout(() => {
                    setUploadSuccess(false);
                }, 5000);
            } else {
                setUploadError(true);
                setUploadSuccess(false);

                setTimeout(() => {
                    setUploadError(false);
                }, 5000);
            }
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteUpload = (uploadId) => {
        setRecentUploads(prev => prev.filter(upload => upload.id !== uploadId));
    };

    return (
        <div>
            <Navbar />
            <main className="min-h-screen w-full pt-24 sm:pt-28 lg:pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline mb-4">
                            FHIR Bundle Upload
                        </h1>

                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-100 p-8 mb-8 shadow-lg">
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 cursor-pointer ${isDragOver
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-green-300 bg-green-50 hover:border-green-400 hover:bg-green-100'
                                }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleUploadClick}
                        >
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 text-green-600 mb-4">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-spline">
                                    Drag & drop a file or click to upload
                                </h3>
                                <p className="text-sm text-green-600 font-spline">
                                    CSV files only
                                </p>
                            </div>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".csv"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-100 p-6 mb-8 shadow-lg">
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-spline mb-6">
                            Upload Instructions
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 text-green-600 mt-0.5">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-spline">
                                    Ensure your file is a valid CSV file.
                                </p>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-6 h-6 text-green-600 mt-0.5">
                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-base text-gray-700 font-spline">
                                    Maximum file size is 10MB.
                                </p>
                            </div>

                        </div>
                    </div>

                    {recentUploads.length > 0 && (
                        <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-lg">
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-spline mb-6">
                                Recent Uploads
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[600px]">
                                    <thead className="bg-green-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 font-spline">FILE NAME</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 font-spline">UPLOAD DATE</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 font-spline">STATUS</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 font-spline">ACTION</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 font-spline">DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {recentUploads.map((upload) => (
                                            <tr key={upload.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 text-sm text-gray-900 font-spline">{upload.fileName}</td>
                                                <td className="px-4 py-3 text-sm text-gray-600 font-spline">{upload.uploadDate}</td>
                                                <td className="px-4 py-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        {upload.status === 'Success' ? (
                                                            <>
                                                                <div className="w-4 h-4 text-green-600">
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-green-600 font-spline">{upload.status}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="w-4 h-4 text-red-600">
                                                                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </div>
                                                                <span className="text-red-600 font-spline">{upload.status}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <button className="text-blue-600 hover:text-blue-800 font-spline transition-colors">
                                                        {upload.action}
                                                    </button>
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    <button
                                                        onClick={() => handleDeleteUpload(upload.id)}
                                                        className="text-red-600 hover:text-red-800 font-spline transition-colors flex items-center gap-1"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {uploadError && (
                        <div className="fixed top-20 right-4 bg-red-100 border border-red-400 rounded-lg p-4 shadow-lg z-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800 font-spline">
                                        Upload failed! Only CSV files are allowed.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {uploadSuccess && (
                        <div className="fixed top-20 right-4 bg-green-100 border border-green-400 rounded-lg p-4 shadow-lg z-50">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-green-800 font-spline">
                                        Upload successful!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Upload