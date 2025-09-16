import React from 'react'

const HowApi = () => {
    const features = [
        {
            title: "Data Integration",
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
            ),
            description: "Our API securely integrates with various Ayush data sources, including traditional texts, research papers, and practitioner databases."
        },
        {
            title: "Intelligent Matching",
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            description: "Leveraging AI and machine learning, the API intelligently matches user queries and health profiles with relevant Ayush treatments, remedies, and practitioners."
        },
        {
            title: "Personalized Recommendations",
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            description: "It provides personalized recommendations for wellness plans, dietary advice, herbal remedies, and suitable Ayush therapies based on individual needs."
        },
        {
            title: "Practitioner Network",
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            description: "Access a verified network of Ayush practitioners, allowing for easy booking of consultations and follow-ups."
        },
        {
            title: "Secure & Scalable",
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            description: "Built with robust security measures and designed for scalability, our API can handle high volumes of requests and sensitive health data."
        },
        {
            title: "Easy Integration",
            icon: (
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            description: "With comprehensive documentation and developer-friendly endpoints, integrating the AyushSync API into your applications is straightforward."
        }
    ];

    return (
        <div className='min-h-screen w-full py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white'>
            <div className='max-w-7xl mx-auto'>
                <div className="text-center mb-16">
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline mb-6'>
                        How our AyushLSync API <span className="text-green-600">works </span>?
                    </h2>
                    <p className='text-lg sm:text-xl text-gray-600 font-spline max-w-3xl mx-auto leading-relaxed'>
                        The AyushSync API provides a seamless interface for integrating traditional Ayush practices into modern digital health solutions. Here's a simplified overview of its functionality:
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className=" border-gray-200 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:border-green-500 border-2 bg-white hover:- transition-all duration-300 ease-in-out"
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

export default HowApi