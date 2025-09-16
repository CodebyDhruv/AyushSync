import React, { useState, useMemo } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const AuditLogs = () => {
    const [isMicroserviceReady, setIsMicroserviceReady] = useState(false)
    const [dateRange, setDateRange] = useState('All Time')
    const [selectedDoctor, setSelectedDoctor] = useState('All Doctors')
    const [selectedPatient, setSelectedPatient] = useState('All Patients')
    const sampleAuditLogs = [
        {
            id: 1,
            doctorId: 'DR1234',
            patientId: 'PT5678',
            diagnosis: 'Hypertension',
            timestamp: '2024-07-26 10:00 AM'
        },
        {
            id: 2,
            doctorId: 'DR5678',
            patientId: 'PT9012',
            diagnosis: 'Diabetes',
            timestamp: '2024-07-26 11:30 AM'
        },
        {
            id: 3,
            doctorId: 'DR1234',
            patientId: 'PT3456',
            diagnosis: 'Asthma',
            timestamp: '2024-07-26 01:00 PM'
        },
        {
            id: 4,
            doctorId: 'DR9012',
            patientId: 'PT7890',
            diagnosis: 'Arthritis',
            timestamp: '2024-07-26 02:45 PM'
        },
        {
            id: 5,
            doctorId: 'DR5678',
            patientId: 'PTI234',
            diagnosis: 'Migraine',
            timestamp: '2024-07-26 04:20 PM'
        },
        {
            id: 6,
            doctorId: 'DR1234',
            patientId: 'PT5678',
            diagnosis: 'Hypertension',
            timestamp: '2024-07-25 09:15 AM'
        },
        {
            id: 7,
            doctorId: 'DR5678',
            patientId: 'PT9012',
            diagnosis: 'Diabetes',
            timestamp: '2024-07-25 12:00 PM'
        }
    ]

    const filteredLogs = useMemo(() => {
        if (!isMicroserviceReady) {
            return []
        }

        let filtered = [...sampleAuditLogs]

        if (selectedDoctor !== 'All Doctors') {
            filtered = filtered.filter(log => log.doctorId === selectedDoctor)
        }

        if (selectedPatient !== 'All Patients') {
            filtered = filtered.filter(log => log.patientId === selectedPatient)
        }

        if (dateRange !== 'All Time') {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

            filtered = filtered.filter(log => {
                const logDate = new Date(log.timestamp)

                switch (dateRange) {
                    case 'Today':
                        return logDate >= today
                    case 'This Week':
                        const weekAgo = new Date(today)
                        weekAgo.setDate(weekAgo.getDate() - 7)
                        return logDate >= weekAgo
                    case 'This Month':
                        const monthAgo = new Date(today)
                        monthAgo.setMonth(monthAgo.getMonth() - 1)
                        return logDate >= monthAgo
                    case 'Last 30 Days':
                        const thirtyDaysAgo = new Date(today)
                        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                        return logDate >= thirtyDaysAgo
                    default:
                        return true
                }
            })
        }

        return filtered
    }, [isMicroserviceReady, selectedDoctor, selectedPatient, dateRange])


    return (
        <div>
            <Navbar />
            <main className="min-h-screen w-full mt-20 pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline mb-4">
                            Audit Logs
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 font-spline">
                            Review and filter audit logs for patient diagnoses and consent status.
                        </p>
                    </div>

                    <div className="bg-gray-100 rounded-lg p-6 mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <label className="text-base font-semibold text-gray-900 font-spline whitespace-nowrap">
                                Filters:
                            </label>
                            <div className="flex flex-col sm:flex-row gap-4 flex-1">
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-900 font-spline focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="All Time">All Time</option>
                                    <option value="Today">Today</option>
                                    <option value="This Week">This Week</option>
                                    <option value="This Month">This Month</option>
                                    <option value="Last 30 Days">Last 30 Days</option>
                                </select>

                                <select
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-900 font-spline focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="All Doctors">All Doctors</option>

                                </select>

                                <select
                                    value={selectedPatient}
                                    onChange={(e) => setSelectedPatient(e.target.value)}
                                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-900 font-spline focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="All Patients">All Patients</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border-2 border-gray-100 shadow-lg overflow-hidden">
                        {filteredLogs.length === 0 ? (
                            <div className="text-center py-16 px-6">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 font-spline mb-2">
                                    No Audit Logs Found
                                </h3>

                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px]">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 font-spline uppercase tracking-wider">
                                                DOCTOR ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 font-spline uppercase tracking-wider">
                                                PATIENT ID
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 font-spline uppercase tracking-wider">
                                                DIAGNOSIS
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 font-spline uppercase tracking-wider">
                                                TIMESTAMP
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredLogs.map((log, index) => (
                                            <tr key={log.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-green-50 transition-colors`}>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-spline font-medium">
                                                    {log.doctorId}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 font-spline font-medium">
                                                    {log.patientId}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700 font-spline">
                                                    {log.diagnosis}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600 font-spline">
                                                    {log.timestamp}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                                    <div className="text-sm text-gray-600 font-spline">
                                        Showing {filteredLogs.length} of {sampleAuditLogs.length} entries
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default AuditLogs
