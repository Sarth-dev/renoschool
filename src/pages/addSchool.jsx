"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");

const onSubmit = async (data) => {
  const formData = new FormData();

  // Append only normal text fields
  formData.append("name", data.name);
  formData.append("address", data.address);
  formData.append("city", data.city);
  formData.append("state", data.state);
  formData.append("contact", data.contact);
  formData.append("email_id", data.email_id);

  // Append file (if selected)
  if (data.image && data.image[0]) {
    formData.append("image", data.image[0]);
  }

  try {
    await axios.post("/api/addSchool", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setMessage("School added successfully!");
  } catch (err) {
    console.error("Upload error:", err);
    setMessage("Error adding school");
  }
};


  return (
    <div className="min-h-screen text-black flex items-center justify-center bg-gray-50 py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add School
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
            <input 
              placeholder="Enter school name"
              {...register("name", { required: true })} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
            />
            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input 
              placeholder="Enter address"
              {...register("address", { required: true })} 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
            />
          </div>

          {/* City & State - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input 
                placeholder="Enter city"
                {...register("city", { required: true })} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input 
                placeholder="Enter state"
                {...register("state", { required: true })} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              />
            </div>
          </div>

          {/* Contact & Email - side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input 
                type="number"
                placeholder="Enter contact"
                {...register("contact", { required: true })} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email"
                placeholder="Enter email"
                {...register("email_id", { required: true })} 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" 
              />
              {errors.email_id && <p className="text-red-500 text-sm">Valid email required</p>}
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <input 
              type="file" 
              {...register("image", { required: true })} 
              className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Button */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition duration-200"
          >
            Add School
          </button>
        </form>

        {message && (
          <p className={`mt-5 text-center font-medium ${message.includes("Error") ? "text-red-500" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
