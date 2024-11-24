// export default GeneralElectionPage;
// --------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GeneralElectionPage({ user, setUser }) {
    const [ongoingElections, setOngoingElections] = useState([]);
    const [upcomingElections, setUpcomingElections] = useState([]);
    const [pastElections, setPastElections] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchElections = async () => {
            try {
                const response = await axios.get('http://localhost:8081/elections');
                console.log('API response:', response.data.data);
        
                const elections = response.data.data; // Directly use the response as it's already an array
        
                const now = new Date();
                const ongoing = [];
                const upcoming = [];
                const past = [];
        
                elections.forEach((election) => {
                    // Use the correct property names
                    const startTime = new Date(election.start_time);
                    const endTime = new Date(election.end_time);
        
                    if (now >= startTime && now <= endTime) {
                        ongoing.push(election);
                    } else if (now < startTime) {
                        upcoming.push(election);
                    } else {
                        past.push(election);
                    }
                });
        
                setOngoingElections(ongoing);
                setUpcomingElections(upcoming);
                setPastElections(past);
            } catch (error) {
                console.error('Error fetching elections:', error);
            }
        };

        fetchElections();
    }, [user, navigate]);

    const handleParticipate = (electionId) => {
        navigate(`/voting/${electionId}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 min-h-screen">

            <nav className="bg-blue-600 p-4 flex justify-between items-center shadow-md">
                <div className="flex space-x-4">
                    <a href="/dashboard" className="text-white hover:text-gray-300 font-medium transition duration-300">Dashboard</a>
                    {user?.isAdmin && (
                        <>
                            <a href="/clubmanagement" className="text-white hover:text-gray-300 font-medium transition duration-300">Club Management</a>
                            <a href="/createElection" className="text-white hover:text-gray-300 font-medium transition duration-300">Create Election</a>
                        </>
                    )}
                </div>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Logout
                </button>
            </nav>

            <div className="container mx-auto p-8">
                <h2 className="text-3xl font-bold mb-8 text-center text-white">All Elections</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {/* Ongoing Elections */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 text-white">Ongoing Elections</h3>
                        <div className="space-y-4">
                            {ongoingElections.map((election) => (
                                <div key={election._id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105">
                                    <h4 className="text-lg font-medium text-blue-700">{election.electionName}</h4>
                                    <p className="text-gray-600">Club: {election.club}</p>
                                    {user?.clubs?.includes(election.club) && (
                                        <button
                                            onClick={() => handleParticipate(election.id)}
                                            className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                                        >
                                            Participate
                                        </button>
                                    )}
                                </div>
                            ))}
                            {ongoingElections.length === 0 && <p className="text-gray-600">No ongoing elections</p>}
                        </div>
                    </section>

                    {/* Upcoming Elections */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 text-white">Upcoming Elections</h3>
                        <div className="space-y-4">
                            {upcomingElections.map((election) => (
                                <div key={election._id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105">
                                    <h4 className="text-lg font-medium text-blue-700">{election.electionName}</h4>
                                    <p className="text-gray-600">Club: {election.club}</p>
                                </div>
                            ))}
                            {upcomingElections.length === 0 && <p className="text-gray-600">No upcoming elections</p>}
                        </div>
                    </section>

                    {/* Past Elections */}
                    <section>
                        <h3 className="text-xl font-semibold mb-4 text-white">Past Elections</h3>
                        <div className="space-y-4">
                            {pastElections.map((election) => (
                                <div key={election._id} className="bg-white rounded-lg shadow-md p-6 transition duration-300 transform hover:scale-105">
                                    <h4 className="text-lg font-medium text-blue-700">{election.electionName}</h4>
                                    <p className="text-gray-600">Club: {election.club}</p>
                                </div>
                            ))}
                            {pastElections.length === 0 && <p className="text-gray-600">No past elections</p>}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default GeneralElectionPage;