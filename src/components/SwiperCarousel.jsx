import React, { useEffect, useRef } from 'react';

const SwiperCarousel = () => {
    const swiperRef = useRef(null);
    const swiperInstance = useRef(null);

    useEffect(() => {
        const loadSwiper = async () => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.4.5/swiper-bundle.min.js';
            script.onload = () => {
                if (window.Swiper && swiperRef.current) {
                    swiperInstance.current = new window.Swiper(swiperRef.current, {
                        slidesPerView: 1,
                        loop: true,
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false,
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true,
                        },
                        navigation: {
                            nextEl: '.custom-swiper-button-next',
                            prevEl: '.custom-swiper-button-prev',
                        },
                        on: {
                            slideChange: function () {
                                if (window.twttr) {
                                    window.twttr.widgets.load();
                                }
                            },
                        },
                    });
                }
            };
            document.body.appendChild(script);

            const twitterScript = document.createElement('script');
            twitterScript.src = 'https://platform.twitter.com/widgets.js';
            twitterScript.charset = 'utf-8';
            twitterScript.async = true;
            document.body.appendChild(twitterScript);
        };

        loadSwiper();

        return () => {
            if (swiperInstance.current) {
                swiperInstance.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="text-center py-8">
                <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 font-spline mb-6'>
                    AYUSH Official <span className="text-green-600">Social Media </span>
                </h2>
            </div>

            <div ref={swiperRef} className="swiper pb-4">
                <div className="swiper-wrapper py-4">

                    <div className="swiper-slide">
                        <div className="h-[680px] bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col">
                            <div className="flex items-center mb-4 shrink-0">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 font-spline">X</h3>
                            </div>
                            <div className="flex-grow overflow-y-auto">
                                <blockquote className="twitter-tweet">
                                    <p lang="en" dir="ltr">Ayurveda Day, initiated in 2016 by the Ministry of Ayush under the visionary guidance of Hon’ble Prime Minister Shri Narendra Modi, was first observed on 28th October 2016 (Dhanteras), marking the birth anniversary of Lord Dhanvantari. (1/2)<a href="https://twitter.com/PMOIndia?ref_src=twsrc%5Etfw">@PMOIndia</a> <a href="https://twitter.com/mpprataprao?ref_src=twsrc%5Etfw">@mpprataprao</a> <a href="https://t.co/OVJ8fYFvX1">pic.twitter.com/OVJ8fYFvX1</a></p>&mdash; Ministry of Ayush (@moayush) <a href="https://twitter.com/moayush/status/1968563729991102885?ref_src=twsrc%5Etfw">September 18, 2025</a>
                                </blockquote>
                            </div>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="h-[680px] bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col">
                            <div className="flex items-center mb-4 shrink-0">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                                </div>
                                <h2 className="text-xl font-bold text font-spline">Instagram</h2>
                            </div>
                            <div className="flex-grow flex items-center justify-center">
                                <iframe src="https://www.instagram.com/p/DFh4n18h4rg/embed" frameBorder="0" scrolling="no" allowTransparency="true" className="w-full h-full max-h-[580px] rounded-lg" title="Instagram Post"></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="h-[680px] bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col">
                            <div className="flex items-center mb-4 shrink-0">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 font-spline">Youtube</h3>
                            </div>
                            <div className="flex-grow aspect-video">
                                <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/AKJ4oE_Kor4?si=Pv4hwFtvF1lqkQZR" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>

                    <div className="swiper-slide">
                        <div className="h-[680px] bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col">
                            <div className="flex items-center mb-4 shrink-0">
                                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4 shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.4 1.4 0 0013 14.19a.48.48 0 000 .13V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.16 3.1 3.99z"></path></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 font-spline">LinkedIn</h3>
                            </div>
                            <div className="flex-grow">
                                <iframe
                                    src="https://www.linkedin.com/embed/feed/update/urn:li:share:7374276182541815808"
                                    className="w-full h-full rounded-lg border-none"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    title="Embedded post">
                                </iframe>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex items-center justify-center gap-8 mt-4">
                <button className="custom-swiper-button-prev p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                    <span className="sr-only">Previous Slide</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <div className="swiper-pagination !relative !bottom-auto !top-auto !w-auto"></div>
                <button className="custom-swiper-button-next p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                    <span className="sr-only">Next Slide</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <style jsx>{`
                .swiper-slide {
                    padding-left: 1rem;
                    padding-right: 1rem;
                }
                @media (min-width: 768px) {
                    .swiper-slide {
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }
                }
                .swiper-pagination-bullet { background-color: #9ca3af !important; margin: 0 4px !important; }
                .swiper-pagination-bullet-active { background-color: #10b981 !important; transform: scale(1.25); }
                .overflow-y-auto::-webkit-scrollbar { width: 5px; }
                .overflow-y-auto::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 10px; }
            `}</style>
        </div>
    );
};

export default SwiperCarousel;