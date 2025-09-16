import React, { useState } from 'react';
import cardiogram from './assets/cardiogram.png'
import { Link } from 'react-router-dom';

export default function Login() {

  const [formData, setFormData] = useState({
    abhaid: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      setSubmittedData(formData);
      console.log('Form Submitted!', formData);
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center"> Login with ABHA ID</h1>
          <p className="text-gray-500 mb-8 text-center">Securely access your health records</p>
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                <div>
                  <label htmlFor="abhaID" className="block text-sm font-medium text-gray-700 mb-1">
                    ABHA ID
                  </label>
                  <input
                    type="text"
                    id="abhaID"
                    name="abhaID"
                    value={formData.abhaID}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder=" Enter your ABHA ID"
                    required
                    disabled={otpSent}
                  />
                </div>

                {otpSent && (
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      name="otp"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200"
                      placeholder="Enter 6-digit OTP"
                      required
                    />
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105 shadow-md"
                >
                  {otpSent ? 'Verify & Login' : 'Send OTP'}
                </button>
              </div>
            </form>
          </div>


        </div>
        <div className="w-full max-w-lg mx-auto text-center text-sm text-gray-600 mt-6">
          <p>
            By logging in, you agree to our <Link to="/terms" className="text-green-600 hover:underline">Terms of Service</Link> and <Link to="/privacy_policy" className="text-green-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </>
  );
}

