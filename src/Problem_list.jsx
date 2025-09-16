import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Problem_list = () => {
    const [selectedCondition, setSelectedCondition] = useState('')
    const [problemList, setProblemList] = useState([])
    const [showDownloadDropdown, setShowDownloadDropdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const dropdownRef = useRef(null)
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDownloadDropdown(false)
            }
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const conditions = [
        { name: 'Hypertension', localCode: 'NAMASTE-001', icdCode: 'I10' },
        { name: 'Type 2 Diabetes Mellitus', localCode: 'NAMASTE-002', icdCode: 'E119' },
        { name: 'Asthma', localCode: 'NAMASTE-003', icdCode: 'J45.909' },
        { name: 'Chronic Obstructive Pulmonary Disease', localCode: 'NAMASTE-004', icdCode: 'J44.1' },
        { name: 'Coronary Artery Disease', localCode: 'NAMASTE-005', icdCode: 'I25.9' },
        { name: 'Heart Failure', localCode: 'NAMASTE-006', icdCode: 'I50.9' },
        { name: 'Chronic Kidney Disease', localCode: 'NAMASTE-007', icdCode: 'N18.6' },
        { name: 'Osteoarthritis', localCode: 'NAMASTE-008', icdCode: 'M19.9' },
        { name: 'Depression', localCode: 'NAMASTE-009', icdCode: 'F32.9' },
        { name: 'Anxiety Disorder', localCode: 'NAMASTE-010', icdCode: 'F41.9' },
        { name: 'Migraine', localCode: 'NAMASTE-011', icdCode: 'G43.909' },
        { name: 'Epilepsy', localCode: 'NAMASTE-012', icdCode: 'G40.909' },
        { name: 'Rheumatoid Arthritis', localCode: 'NAMASTE-013', icdCode: 'M06.9' },
        { name: 'Hypothyroidism', localCode: 'NAMASTE-014', icdCode: 'E03.9' },
        { name: 'Hyperthyroidism', localCode: 'NAMASTE-015', icdCode: 'E05.90' }
    ]

    const filteredConditions = conditions.filter(condition =>
        condition.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.localCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        condition.icdCode.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSearchChange = (e) => {
        const query = e.target.value
        setSearchQuery(query)
        setShowSearchResults(query.length > 0)
        setSelectedIndex(-1)
    }

    const handleSearchFocus = () => {
        if (searchQuery.length > 0) {
            setShowSearchResults(true)
        }
    }

    const handleConditionSelect = (condition) => {
        setSelectedCondition(condition.name)
        setSearchQuery(condition.name)
        setShowSearchResults(false)
        setSelectedIndex(-1)
    }

    const handleKeyDown = (e) => {
        if (!showSearchResults) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev =>
                    prev < filteredConditions.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
                break
            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0 && selectedIndex < filteredConditions.length) {
                    handleConditionSelect(filteredConditions[selectedIndex])
                }
                break
            case 'Escape':
                setShowSearchResults(false)
                setSelectedIndex(-1)
                break
        }
    }

    const addCondition = () => {
        if (selectedCondition && !problemList.find(item => item.name === selectedCondition)) {
            const condition = conditions.find(c => c.name === selectedCondition)
            if (condition) {
                setProblemList([...problemList, condition])
            }
        }
    }

    const removeCondition = (conditionToRemove) => {
        setProblemList(problemList.filter(condition => condition.name !== conditionToRemove))
    }

    const generateFHIRBundle = () => {
        if (problemList.length === 0) return null

        const entries = problemList.map((condition, index) => ({
            "fullUrl": `urn:uuid:some-problemlist-uuid-${index + 1}`,
            "resource": {
                "resourceType": "List",
                "id": `some-problemlist-uuid-${index + 1}`,
                "status": "current",
                "mode": "snapshot",
                "title": "Problem List",
                "code": {
                    "coding": [{
                        "system": "http://loinc.org",
                        "code": "11450-4",
                        "display": "Problem list Reported"
                    }]
                },
                "entry": [{
                    "item": {
                        "reference": `Condition/condition-${index + 1}`,
                        "display": condition.name
                    }
                }]
            }
        }))

        return {
            "resourceType": "Bundle",
            "type": "collection",
            "entry": entries
        }
    }

    const fhirBundle = generateFHIRBundle()

    const downloadAsJSON = () => {
        if (!fhirBundle) return

        const dataStr = JSON.stringify(fhirBundle, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

        const exportFileDefaultName = 'problem-list-fhir.json'

        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    const downloadAsCSV = () => {
        if (problemList.length === 0) return

        const headers = ['Condition', 'NAMASTE Code', 'ICD-11 Mapped Code']
        const csvContent = [
            headers.join(','),
            ...problemList.map(condition => [
                `"${condition.name}"`,
                `"${condition.localCode}"`,
                `"${condition.icdCode}"`
            ].join(','))
        ].join('\n')

        const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent)

        const exportFileDefaultName = 'problem-list.csv'

        const linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
    }

    const downloadAsPDF = () => {
        if (problemList.length === 0) return

        const printWindow = window.open('', '_blank')

        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Problem List</title>
                    <style>
                        @media print {
                            @page {
                                margin: 0.5in;
                                size: A4;
                            }
                            body {
                                font-family: 'Arial', sans-serif;
                                font-size: 12px;
                                line-height: 1.4;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                        }
                        body {
                            font-family: 'Arial', sans-serif;
                            font-size: 12px;
                            line-height: 1.4;
                            color: #333;
                            margin: 20px;
                            padding: 0;
                        }
                        h1 {
                            color: #16a34a;
                            font-size: 24px;
                            margin-bottom: 20px;
                            text-align: center;
                            border-bottom: 2px solid #16a34a;
                            padding-bottom: 10px;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 20px;
                            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 12px 8px;
                            text-align: left;
                            vertical-align: top;
                        }
                        th {
                            background-color: #16a34a;
                            color: white;
                            font-weight: bold;
                            text-transform: uppercase;
                            font-size: 11px;
                            letter-spacing: 0.5px;
                        }
                        tr:nth-child(even) {
                            background-color: #f9f9f9;
                        }
                        tr:hover {
                            background-color: #f0f9ff;
                        }
                        .footer {
                            margin-top: 30px;
                            text-align: center;
                            font-size: 10px;
                            color: #666;
                            border-top: 1px solid #ddd;
                            padding-top: 10px;
                        }
                    </style>
                </head>
                <body>
                    <h1>AyushSync Report</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Condition</th>
                                <th>NAMASTE Code</th>
                                <th>ICD-11 Mapped Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${problemList.map(condition => `
                                <tr>
                                    <td><strong>${condition.name}</strong></td>
                                    <td>${condition.localCode}</td>
                                    <td>${condition.icdCode}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <div class="footer">
                        Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}<br>
                        Total Conditions: ${problemList.length}
                    </div>
                </body>
            </html>
        `

        printWindow.document.write(htmlContent)
        printWindow.document.close()

        printWindow.onload = () => {
            setTimeout(() => {
                printWindow.print()
                printWindow.close()
            }, 250)
        }
    }

    const handleDownload = (format) => {
        setShowDownloadDropdown(false)
        switch (format) {
            case 'json':
                downloadAsJSON()
                break
            case 'csv':
                downloadAsCSV()
                break
            case 'pdf':
                downloadAsPDF()
                break
            default:
                break
        }
    }

    return (
        <div>
            <Navbar />

            <main className='min-h-screen w-full pt-24 sm:pt-28 lg:pt-32 flex flex-col gap-10 px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col max-w-4xl mx-auto w-full'>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline text-center sm:text-left">Problem List Builder</h1>
                    <p className="mt-4 text-lg sm:text-xl text-gray-600 font-spline text-center sm:text-left">Map local medical terms to standardized FHIR resources.</p>
                </div>

                <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-spline max-w-4xl mx-auto w-full'>Add Condition</h2>
                <div className="bg-white p-4 sm:p-6 max-w-4xl mx-auto w-full rounded-xl border-2 min-h-40 border-gray-100 flex items-center justify-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 w-full">
                        <div className="flex-1 w-full sm:w-auto">
                            <label className="block text-base sm:text-lg font-spline font-bold text-gray-900 mb-2">
                                Condition
                            </label>
                            <div className="relative" ref={searchRef}>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border font-spline border-gray-500 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 h-12 text-base"
                                    placeholder="Search conditions..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onFocus={handleSearchFocus}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>

                                {showSearchResults && filteredConditions.length > 0 && (
                                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                        {filteredConditions.map((condition, index) => (
                                            <div
                                                key={index}
                                                className={`px-4 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${index === selectedIndex ? 'bg-green-50' : ''
                                                    }`}
                                                onClick={() => handleConditionSelect(condition)}
                                            >
                                                <div className="font-medium text-gray-900 font-spline text-base">{condition.name}</div>
                                                <div className="text-sm text-gray-500 font-spline">
                                                    {condition.localCode} • {condition.icdCode}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {showSearchResults && filteredConditions.length === 0 && searchQuery.length > 0 && (
                                    <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                                        <div className="px-4 py-3 text-gray-500 text-center font-spline">
                                            No conditions found
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            className="flex flex-row gap-2 items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-500 font-spline"
                            onClick={addCondition}
                        >
                            <span className="text-lg font-bold">+</span>
                            <span className='text-lg font-bold'>Add Condition</span>
                        </button>
                    </div>
                </div>

                <div className='max-w-4xl mx-auto w-full'>
                    <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-spline mb-6'>Problem List</h2>
                    <div className="bg-white rounded-xl border-2 border-gray-100 overflow-x-auto">
                        {problemList.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                <p className="text-base sm:text-lg font-spline">Select conditions from dropdown to display here</p>
                            </div>
                        ) : (
                            <div className="overflow-hidden">
                                <div className="grid grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-50 font-bold text-xs sm:text-sm text-gray-700 min-w-[600px] font-spline">
                                    <div>CONDITION</div>
                                    <div>NAMASTE CODE</div>
                                    <div>ICD-11 MAPPED CODE</div>
                                    <div></div>
                                </div>
                                {problemList.map((condition, index) => (
                                    <div key={index} className="grid grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 border-t border-gray-100 min-w-[600px]">
                                        <div className="font-medium text-sm sm:text-base font-spline">{condition.name}</div>
                                        <div className="text-gray-600 text-sm sm:text-base font-spline">{condition.localCode}</div>
                                        <div className="text-gray-600 text-sm sm:text-base font-spline">{condition.icdCode}</div>
                                        <div>
                                            <button
                                                onClick={() => removeCondition(condition.name)}
                                                className="text-red-500 hover:text-red-700 text-sm font-spline"
                                            >
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="#e01b24" viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><title></title><path d="M50.86,13.38H13a1.5,1.5,0,0,1,0-3H50.86a1.5,1.5,0,0,1,0,3Z"></path><path d="M42.4,57.93H21.48a5.5,5.5,0,0,1-5.5-5.5V11.87a1.5,1.5,0,0,1,1.5-1.5H46.4a1.5,1.5,0,0,1,1.5,1.5V52.43A5.51,5.51,0,0,1,42.4,57.93ZM19,13.37V52.43a2.5,2.5,0,0,0,2.5,2.5H42.4a2.5,2.5,0,0,0,2.5-2.5V13.37Z"></path><path d="M40,13.37H23.9a1.5,1.5,0,0,1-1.5-1.5V6.57a1.5,1.5,0,0,1,1.5-1.5H40a1.5,1.5,0,0,1,1.5,1.5v5.3A1.5,1.5,0,0,1,40,13.37Zm-14.58-3H38.48V8.07H25.4Z"></path><path d="M24.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,24.94,47.61Z"></path><path d="M38.94,47.61a1.5,1.5,0,0,1-1.5-1.5V21.46a1.5,1.5,0,0,1,3,0V46.11A1.5,1.5,0,0,1,38.94,47.61Z"></path><path d="M31.94,40.38a1.5,1.5,0,0,1-1.5-1.5V28.7a1.5,1.5,0,1,1,3,0V38.88A1.5,1.5,0,0,1,31.94,40.38Z"></path></g></svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className='max-w-4xl mx-auto w-full pb-20'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
                        <h2 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-spline'>FHIR JSON Preview</h2>
                        {problemList.length > 0 && (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-spline text-sm font-medium"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {showDownloadDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                        <div className="py-1">
                                            <button
                                                onClick={() => handleDownload('json')}
                                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 font-spline"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download as JSON
                                            </button>
                                            <button
                                                onClick={() => handleDownload('csv')}
                                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 font-spline"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Download as CSV
                                            </button>
                                            <button
                                                onClick={() => handleDownload('pdf')}
                                                className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 font-spline"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                Download as PDF
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-50 rounded-xl border-2 border-gray-100 p-4 sm:p-6">
                        {!fhirBundle ? (
                            <div className="text-center text-gray-500 py-8">
                                <p className="text-base sm:text-lg font-spline">JSON preview will appear here when conditions are selected</p>
                            </div>
                        ) : (
                            <pre className="text-xs sm:text-sm text-gray-800 overflow-x-auto whitespace-pre-wrap font-spline">
                                {JSON.stringify(fhirBundle, null, 2)}
                            </pre>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    )
}

export default Problem_list