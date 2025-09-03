"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get("/api/getSchools").then((res) => setSchools(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Explore Schools
        </h1>

        {schools.length === 0 ? (
          <p className="text-center text-gray-500">No schools found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {schools.map((school) => (
              <div
                key={school.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
              >
                {/* School Image */}
                <img
                  src={`/uploads/${school.image}`}
                  alt={school.name}
                  className="h-48 w-full object-cover"
                  onError={(e) => (e.target.src = "/defaultschool.jpg")} // fallback
                />

                {/* Card Content */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {school.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{school.address}</p>
                  <p className="text-gray-500 text-sm">{school.city}</p>

                  {/* Divider */}
                  <div className="border-t my-3"></div>

                  {/* CTA */}
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition duration-200">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
