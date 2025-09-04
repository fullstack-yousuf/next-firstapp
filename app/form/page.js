"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const today = new Date();
  const maxDobDate = new Date(today.getFullYear() - 18, 11, 31);
  const maxDob = maxDobDate.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    appointmentType: "walkin",
    firstName: "",
    lastName: "",
    dob: "",
    visitType: "consultation",
    datetime: "",
  });

  const [errors, setErrors] = useState({});
  const [liveTime, setLiveTime] = useState("");

  // Auto-update live time if walk-in
  useEffect(() => {
    if (formData.appointmentType === "walkin") {
      const updateTime = () => {
        const now = new Date();
        const formattedNow = now.toISOString().slice(0, 16); // yyyy-MM-ddTHH:mm
        setFormData((prev) => ({ ...prev, datetime: formattedNow }));
        setLiveTime(
          now.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        );
      };

      updateTime(); // set immediately
      const timer = setInterval(updateTime, 1000); // update every sec

      return () => clearInterval(timer);
    }
  }, [formData.appointmentType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.datetime) newErrors.datetime = "Date & time is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Form submitted successfully!");
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Appointment Booking
      </h2>

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
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-100 dark:text-black"
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
            className={`w-full p-2 border rounded-md dark:bg-gray-100 dark:text-black ${
              errors.firstName ? "border-red-500" : "border-gray-300"
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
            className={`w-full p-2 border rounded-md dark:bg-gray-100 dark:text-black ${
              errors.lastName ? "border-red-500" : "border-gray-300"
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
            max={maxDob}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md dark:bg-gray-100 dark:text-black ${
              errors.dob ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dob && (
            <span className="text-red-500 text-sm">{errors.dob}</span>
          )}
        </div>

        {/* Visit Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visit Type:
          </label>
          <select
            name="visitType"
            value={formData.visitType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-100 dark:text-black"
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

          {formData.appointmentType === "walkin" ? (
            <div className="w-full p-2 border border-gray-300 rounded-md text-gray-500 dark:bg-gray-100 ">
              {liveTime || "Loading current time..."}
            </div>
          ) : (
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md dark:bg-gray-100 dark:text-black ${
                errors.datetime ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}

          {errors.datetime && (
            <span className="text-red-500 text-sm">{errors.datetime}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Page;
