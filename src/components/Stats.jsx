import React, { useState, useEffect, useRef } from 'react';

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef(null);

    useEffect(() => {
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) {
                startTime = timestamp;
            }

            const progress = timestamp - startTime;
            const easeOutProgress = 1 - Math.pow(1 - (progress / duration), 3);
            const currentCount = Math.min(Math.floor(end * easeOutProgress), end);

            setCount(currentCount);

            if (progress < duration) {
                frameRef.current = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [end, duration]);

    return new Intl.NumberFormat('en-US').format(count);
};


const Users = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
    </svg>
);

const FileText = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const LinkIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

const Clock = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Stats = () => {
    const leftStats = [
        {
            icon: <Users className="w-8 h-8" />,
            label: "No. of Users Registered",
            value: "50",
            bgColor: "bg-teal-50",
            iconColor: "text-teal-600",
            borderColor: "border-teal-200"
        },
        {
            icon: <FileText className="w-8 h-8" />,
            label: "Total NAMASTE Codes",
            value: "7000",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            borderColor: "border-blue-200"
        }
    ];

    const rightStats = [
        {
            icon: <LinkIcon className="w-8 h-8" />,
            label: "Mappings Created",
            value: "2000",
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            borderColor: "border-green-200"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            label: "API Calls (24h)",
            value: "100",
            bgColor: "bg-indigo-50",
            iconColor: "text-indigo-600",
            borderColor: "border-indigo-200"
        }
    ];

    const StatCard = ({ stat, side, index }) => {
        const endValue = parseInt(stat.value.replace(/,/g, ''), 10);

        return (
            <div
                className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm bg-opacity-90 transform hover:scale-105`}
                style={{
                    animationDelay: `${index * 0.2}s`,
                    animation: `${side === 'left' ? 'slideInLeft' : 'slideInRight'} 0.8s ease-out forwards`
                }}
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`${stat.iconColor} ${stat.bgColor} p-4 rounded-full border-2 ${stat.borderColor} shadow-sm`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-600 mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-gray-900">
                            <CountUp end={endValue} duration={2000} />
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="absolute left-8 xl:left-16 top-1/2 transform -translate-y-1/2 space-y-8 hidden lg:block z-20">
                {leftStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} side="left" index={index} />
                ))}
            </div>

            <div className="absolute right-8 xl:right-16 top-1/2 transform -translate-y-1/2 space-y-8 hidden lg:block z-20">
                {rightStats.map((stat, index) => (
                    <StatCard key={index} stat={stat} side="right" index={index + 2} />
                ))}
            </div>

            <div className="absolute bottom-8 left-4 right-4 lg:hidden z-20">
                <div className="grid grid-cols-2 gap-4">
                    {[...leftStats, ...rightStats].map((stat, index) => {
                        const endValue = parseInt(stat.value.replace(/,/g, ''), 10);
                        return (
                            <div key={index} className={`${stat.bgColor} ${stat.borderColor} border-2 rounded-xl p-4 shadow-lg backdrop-blur-sm bg-opacity-90`}>
                                <div className="flex items-center space-x-3">
                                    <div className={`${stat.iconColor} flex-shrink-0`}>
                                        {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-semibold text-gray-600 truncate">{stat.label}</p>
                                        <p className="text-lg font-bold text-gray-900">
                                            <CountUp end={endValue} duration={1500} />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideInLeft {
                  from {
                    opacity: 0;
                    transform: translateX(-100px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }

                @keyframes slideInRight {
                  from {
                    opacity: 0;
                    transform: translateX(100px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
            `}</style>
        </>
    );
};

export default Stats;
