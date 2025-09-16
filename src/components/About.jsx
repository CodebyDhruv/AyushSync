import React from 'react'

const About = () => {
    const aboutData = [{
        head: "Our Mission",
        icon: (
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        para: "AyushSync bridges traditional AYUSH medicine with global healthcare standards through intelligent terminology mapping and seamless data integration."
    },
    {
        head: "Our Team",
        icon: (
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        para: "We're a dedicated team of healthcare informatics experts, developers, and medical professionals passionate about revolutionizing healthcare data interoperability."
    },
    {
        head: "Our Impact",
        icon: (
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        para: "We enable healthcare providers to make better decisions, reduce medical errors, and improve patient outcomes through standardized medical terminologies and efficient data exchange."
    }
    ];
    return (
        <div id="about-section" className='min-h-screen w-full pb-30 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32'>
            <div className='flex flex-col justify-center items-center gap-7 max-w-6xl mx-auto'>
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline mb-6'>
                    About <span className="text-green-600">Us </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {aboutData.map((item, index) => (
                        <div key={index} className="card rounded-xl border-gray-200 p-6 sm:p-8 w-full hover:shadow-2xl hover:- transition-all duration-300 ease-in-out hover:border-green-500 border-2 bg-white">
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 flex justify-center">{item.icon}</div>
                                <h3 className='text-xl sm:text-2xl font-bold font-spline text-gray-900 mb-4'>{item.head}</h3>
                                <p className='text-gray-700 text-sm sm:text-base leading-relaxed font-spline'>{item.para}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default About
