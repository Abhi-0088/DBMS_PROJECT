

// export default Voting;
// ---------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Voting() {
    const { electionId } = useParams();
    const [electionData, setElectionData] = useState(null);
    const [timeLeft, setTimeLeft] = useState('');
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchElectionData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/elections/${electionId}`);
                setElectionData(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching election data:', err);
                setError('Failed to load election data.');
                setLoading(false);
            }
        };
        fetchElectionData();
    }, [electionId]);

    useEffect(() => {
        if (!electionData) return;

        const calculateTimeLeft = () => {
            console.log("electionData",electionData)
            const end = new Date(electionData.end_time);
            const now = new Date();
            const timeDifference = end - now;
            console.log("time difference: ",timeDifference)

            if (timeDifference > 0) {
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Election Ended');
            }
        };

        const timerId = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timerId);
    }, [electionData]);


    const handleVote = (index) => {
        if (!hasVoted) {
            setSelectedCandidate(index);
        }
    };

    const handleSubmitVote = async () => {
        if (selectedCandidate === null) {
            alert('Please select a candidate to vote for!');
            return;
        }
    
        if (!hasVoted) {
            setHasVoted(true);
            const selectedCandidateData = electionData.candidates[selectedCandidate];
            console.log('from client selected id: ',selectedCandidateData.id)
    
            try {
                // API call to submit the vote
                const response = await axios.post(
                    `http://localhost:8081/elections/increaseVoteCount`,
                    { candidate_id: selectedCandidateData.id } // Adjust key name if API expects different key
                );
    
                console.log('Vote API response:', response.data);
    
                if (response.data.success) {
                    alert(`Your vote for ${selectedCandidateData.name} has been submitted.`);
                    navigate('/generalElectionPage');
                } else {
                    alert('Error submitting vote: ' + response.data.message);
                    setHasVoted(false); // Allow retry if submission fails
                }
            } catch (error) {
                console.error('Error submitting vote:', error);
                alert('Failed to submit vote. Please try again.');
                setHasVoted(false); // Allow retry if submission fails
            }
        }
    };

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <p className="text-white text-lg font-medium">Loading...</p>
            </div>
        );
    }

    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;


    return (
        <div className="bg-gradient-to-r from-blue-500 via-teal-400 to-green-400 min-h-screen p-8">
            <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-4 text-center text-indigo-700">Election Voting</h2>
                <p className="text-lg mb-6 text-center text-gray-700">Time Left: {timeLeft}</p>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {electionData && electionData.candidates.map((candidate, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-2 text-indigo-700">{candidate.name}</h3>
                            <p className="text-gray-700 mb-4">{candidate.description}</p>
                            <button
                                onClick={() => handleVote(index)}
                                disabled={hasVoted}
                                className={`
                                    w-full py-2 rounded-lg text-white font-medium 
                                    ${selectedCandidate === index ? 'bg-green-500 hover:bg-green-600' : 'bg-indigo-500 hover:bg-indigo-600'} 
                                    disabled:opacity-50 disabled:cursor-not-allowed transition duration-300
                                `}
                            >
                                {selectedCandidate === index ? 'Selected' : 'Vote'}
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    onClick={handleSubmitVote}
                    disabled={hasVoted}
                    className={`
                        mt-8 w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                        text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition duration-300
                    `}
                >
                    Submit Vote
                </button>
            </div>
        </div>
    );
}

export default Voting;