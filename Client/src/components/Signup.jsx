import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import erc20abi from './ElectionABI.json'; // Import your ABI

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [walletId, setWalletId] = useState(''); // This could be a student ID, roll number, etc.
    const [department, setDepartment] = useState('');
    const [clubs, setClubs] = useState([]);
    const navigate = useNavigate();

    const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Physics', 'Chemistry'];
    const clubOptions = ['Coding Club', 'Robotics Club', 'Music Club', 'Drama Club', 'Sports Club'];

    const handleClubChange = (club) => {
        setClubs(prevClubs => prevClubs.includes(club)
            ? prevClubs.filter(c => c !== club)
            : [...prevClubs, club]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = { username, email, password, walletId, department, clubs };

        try {
            const response = await axios.post('http://localhost:8081/signup', signupData);
            console.log("Signup successful:", response.data);

            navigate('/login')

        } catch (signupError) {
            console.error("Signup error:", signupError);
            alert("Signup failed. Please check your details and try again. " + signupError.message ); //More informative message

        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 flex items-center justify-center py-12">
            <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                           onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>


                    {/* Wallet ID / Roll Number Input */}
                    <div>
                        <label htmlFor="walletId" className="block text-sm font-medium text-gray-700">Wallet ID</label>
                        <input
                            type="text"
                            id="walletId"
                            value={walletId}
                            onChange={(e) => setWalletId(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Department select */}
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                        <select
                            id="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>


                   {/* Club Checkboxes */}
                 <div>
                        <label className="block text-sm font-medium text-gray-700">Clubs</label>
                         <div className="mt-1">
                            {clubOptions.map((club) => (
                                <div key={club} className="flex items-center space-x-3 mb-2">
                                    <input
                                        type="checkbox"
                                        id={club}
                                        checked={clubs.includes(club)}
                                        onChange={() => handleClubChange(club)}
                                        className="h-4 w-4 rounded border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <label htmlFor={club} className="text-sm text-gray-700">
                                        {club}
                                    </label>
                            </div>
                           ))}
                         </div>
                </div>


                    <button
                        type="submit"
                        className="w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;