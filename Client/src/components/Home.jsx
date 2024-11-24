// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 flex items-center justify-center py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="w-full rounded-xl shadow-lg bg-white overflow-hidden relative z-10"> {/* Added z-index */}
        <div className="md:flex">
          {/* Left: Image/Graphic (Optional) */}
          <div className="md:w-1/2 hidden md:block relative"> {/* Added hidden for mobile view */}
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 opacity-75"></div> {/* Gradient overlay */}
            <img 
              src="https://th.bing.com/th?id=OIP.kG5Avr1L9_AFoLgbtDOjvAHaE0&w=309&h=201&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" // Replace with your image
              alt="Voting Graphic" 
              className="w-full h-full object-cover mix-blend-multiply" // Mix-blend-mode for effect
            />
          </div>

          {/* Right: Content */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-700 leading-tight">Decentralized Voting System</h1>
            <p className="text-lg md:text-xl text-gray-700 text-center mt-4">
              Ensuring Transparent and Fair Elections in Student Clubs Using Blockchain Technology.
            </p>
            <Link to="/login" className="mt-8">
              <button className="bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium py-3 px-8 rounded-full hover:from-teal-600 hover:to-green-600 transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        </div>
        {/* Decorative blob  */}
        <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-blue-200 opacity-50 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
       <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-green-200 opacity-50 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}


export default Home;