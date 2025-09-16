import React, { useState } from 'react';
import cardiogram from './assets/cardiogram.png'
import { Link } from 'react-router-dom';

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        abhaId: '',
        otp: ''
    });

    const [otpSent, setOtpSent] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
        }

        const abhaRegex = /^\d{2}-\d{4}-\d{4}-\d{4}$/;
        if (!formData.abhaId.trim()) {
            newErrors.abhaId = 'ABHA ID is required';
        } else if (!abhaRegex.test(formData.abhaId)) {
            newErrors.abhaId = 'ABHA ID must be in format: XX-XXXX-XXXX-XXXX';
        }

        if (otpSent) {
            if (!formData.otp.trim()) {
                newErrors.otp = 'OTP is required';
            } else if (formData.otp.length !== 6) {
                newErrors.otp = 'OTP must be 6 digits';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!otpSent) {
            setOtpSent(true);
            console.log('Sending OTP to:', formData.phoneNumber);
        } else {
            console.log('Signup completed with data:', formData);
            alert('Signup successful!');
        }
    };

    const formatABHAId = (value) => {
        const digits = value.replace(/\D/g, '');

        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
        if (digits.length <= 10) return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}-${digits.slice(10, 14)}`;
    };

    const handleABHAIdChange = (e) => {
        const formatted = formatABHAId(e.target.value);
        setFormData(prev => ({
            ...prev,
            abhaId: formatted
        }));

        if (errors.abhaId) {
            setErrors(prev => ({
                ...prev,
                abhaId: ''
            }));
        }
    };

    return (
        <>
            <nav>
                <div className="fixed top-0 left-0 w-full flex items-center border-b-2 border-b-gray-200 shadow-sm bg-white z-50 px-4 sm:px-8 md:px-16 py-2">
                    <Link to="/">
                        <div className="logo flex flex-row gap-3 justify-center items-center">
                            <img className="h-10 w-fit" src={cardiogram} title="medical icons" alt="" />
                            <h1 className="font-bold text-xl font-spline">AyushSync</h1>
                        </div>
                    </Link>
                </div>
            </nav>
            <div className="bg-slate-100 min-h-screen flex flex-col items-center justify-center font-sans pt-24 sm:pt-28 lg:pt-32 px-4">
                <div className="w-full max-w-lg mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Create Your Account</h1>
                    <p className="text-gray-500 mb-8 text-center">Join AyushSync to securely manage your health records</p>
                    <div className="bg-white rounded-2xl shadow-lg p-8">

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your full name"
                                        required
                                        disabled={otpSent}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your email address"
                                        required
                                        disabled={otpSent}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your 10-digit phone number"
                                        maxLength="10"
                                        required
                                        disabled={otpSent}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                                </div>

                                <div>
                                    <label htmlFor="abhaId" className="block text-sm font-medium text-gray-700 mb-1">
                                        ABHA ID *
                                    </label>
                                    <input
                                        type="text"
                                        id="abhaId"
                                        name="abhaId"
                                        value={formData.abhaId}
                                        onChange={handleABHAIdChange}
                                        className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.abhaId ? 'border-red-500' : 'border-gray-300'}`}
                                        placeholder="Enter your ABHA ID"
                                        maxLength="17"
                                        required
                                        disabled={otpSent}
                                    />
                                    {errors.abhaId && <p className="text-red-500 text-xs mt-1">{errors.abhaId}</p>}
                                    <p className="text-xs text-gray-500 mt-1">Format: XX-XXXX-XXXX-XXXX</p>
                                </div>

                                {otpSent && (
                                    <div className="border-t pt-6">
                                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                                            <p className="text-sm text-green-800">
                                                OTP sent to +91-{formData.phoneNumber}
                                            </p>
                                        </div>
                                        <div>
                                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                                Enter OTP *
                                            </label>
                                            <input
                                                type="text"
                                                id="otp"
                                                name="otp"
                                                value={formData.otp}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 ${errors.otp ? 'border-red-500' : 'border-gray-300'}`}
                                                placeholder="Enter 6-digit OTP"
                                                maxLength="6"
                                                required
                                            />
                                            {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 shadow-md"
                                >
                                    {otpSent ? 'Verify OTP & Complete Signup' : 'Send OTP'}
                                </button>
                            </div>

                            {otpSent && (
                                <div className="mt-4 text-center">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setOtpSent(false);
                                            setFormData(prev => ({ ...prev, otp: '' }));
                                            setErrors(prev => ({ ...prev, otp: '' }));
                                        }}
                                        className="text-sm text-green-600 hover:underline"
                                    >
                                        ← Back to edit details
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                <div className="w-full max-w-lg mx-auto text-center text-sm text-gray-600 mt-6">
                    <p>
                        Already have an account? <Link to="/login" className="text-green-600 hover:underline font-medium">Login here</Link>
                    </p>
                    <p className="mt-2">
                        By signing up, you agree to our <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link to="/privacy_policy" className="text-green-600 hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </>
    );
}