import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setUser }) {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = { email, password };
        try {
            const response = await axios.post('http://localhost:8081/login', loginData);
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/generalElectionPage');
        } catch (error) {
            console.error("Login error:", error);
            // Consider adding user-friendly error handling (e.g., display an error message)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 flex items-center justify-center py-12">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login to Vote</h2>
                <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased spacing */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"  
                            id="email"      
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;