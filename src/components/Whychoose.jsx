import React from 'react'

const WhyChoose = () => {
    const features = [
        {
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            title: "Smart Search",
            description: "Advanced search capabilities to quickly find and map medical terminologies across different systems."
        },
        {
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Secure & Compliant",
            description: "Built with healthcare-grade security standards and full compliance with medical data regulations."
        },
        {
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
            ),
            title: "Seamless Integration",
            description: "Experience a user-friendly platform designed for easy navigation and access to resources."
        },
        {
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Global Standards",
            description: "Supports international medical coding standards including ICD-11, SNOMED CT, and AYUSH terminologies."
        }
    ];

    return (
        <div id="why-choose-section" className='min-h-screen w-full py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white'>
            
            <div className='max-w-7xl mx-auto'>
                <div className="text-center mb-16">
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline mb-6'>
                        Why Choose <span className="text-green-600">AyushSync </span>?
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-600 font-spline max-w-3xl mx-auto leading-relaxed'>
                        Experience the future of healthcare terminology mapping with our cutting-edge platform designed for modern medical professionals.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className=" border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:border-green-500 border-2 bg-white hover:-transition-all duration-300 ease-in-out"
                        >
                            <div className="text-center">
                                <div className="mb-6 flex justify-center">{feature.icon}</div>
                                <h3 className='text-xl sm:text-2xl font-bold font-spline text-gray-900 mb-4'>
                                    {feature.title}
                                </h3>
                                <p className='text-gray-600 text-base leading-relaxed font-spline'>
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    )
}

export default WhyChoose