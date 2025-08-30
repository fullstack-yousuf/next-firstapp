"use client";

import { useState, useEffect } from 'react';

const page = () => {
   const [formData, setFormData] = useState({
    appointmentType: 'walkin',
    firstName: '',
    lastName: '',
    dob: '',
    visitType: 'consultation',
    datetime: ''
  });

  const [isAdult, setIsAdult] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate if user is 18+ based on DOB
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const isAdultTemp = age >= 18;
      setIsAdult(isAdultTemp);
      
      if (!isAdultTemp) {
        setErrors(prev => ({...prev, dob: "Must be 18 or older to continue"}));
      } else {
        setErrors(prev => ({...prev, dob: null}));
      }
    } else {
      setIsAdult(false);
    }
  }, [formData.dob]);

  // Set current datetime if appointment type is walkin
  useEffect(() => {
    if (formData.appointmentType === 'walkin') {
      const now = new Date();
      const formattedNow = now.toISOString().slice(0, 16);
      setFormData(prev => ({...prev, datetime: formattedNow}));
    }
  }, [formData.appointmentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value}));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: null}));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.datetime) newErrors.datetime = "Date and time is required";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    if (!isAdult) {
      alert("You must be 18 or older to submit this form");
      return;
    }
    
    // Form submission logic would go here
    alert("Form submitted successfully!");
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Appointment Booking</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Appointment Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Type:
          </label>
          <select 
            name="appointmentType" 
            value={formData.appointmentType} 
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="walkin">Walk-in</option>
            <option value="booked">Booked</option>
          </select>
        </div>
        
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name:
          </label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.firstName && (
            <span className="text-red-500 text-sm">{errors.firstName}</span>
          )}
        </div>
        
        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name:
          </label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">{errors.lastName}</span>
          )}
        </div>
        
        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth:
          </label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.dob ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dob && (
            <span className="text-red-500 text-sm">{errors.dob}</span>
          )}
          {formData.dob && isAdult && (
            <span className="text-green-600 text-sm">✓ Valid age</span>
          )}
        </div>
        
        {/* Only show these fields if user is 18+ */}
        {isAdult && (
          <>
            {/* Visit Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Visit Type:
              </label>
              <select 
                name="visitType" 
                value={formData.visitType} 
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="consultation">Consultation</option>
                <option value="followup">Follow-up</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
            
            {/* Date & Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Appointment Date & Time:
              </label>
              <input 
                type="datetime-local" 
                name="datetime" 
                value={formData.datetime} 
                onChange={handleChange}
                disabled={formData.appointmentType === 'walkin'}
                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.datetime ? 'border-red-500' : 'border-gray-300'
                } ${formData.appointmentType === 'walkin' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              />
              {errors.datetime && (
                <span className="text-red-500 text-sm">{errors.datetime}</span>
              )}
              {formData.appointmentType === 'walkin' && (
                <span className="text-gray-500 text-sm">Current date/time used for walk-in</span>
              )}
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Book Appointment
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default page
