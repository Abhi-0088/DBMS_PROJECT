// -----------------------------------------------------------------




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ethers } from 'ethers';
import ElectionABI from './ElectionABI.json'; // Import your Election contract ABI

function Home({ setElectionData }) {
  const [electionName, setElectionName] = useState('');
  const [numCandidates, setNumCandidates] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [club, setClub] = useState('');
  const clubs = ['Coding Club', 'Robotics Club', 'Music Club', 'Drama Club', 'Sports Club'];
  const navigate = useNavigate();

  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // **Replace with your contract address**

  const handleNumCandidatesChange = (e) => {
    const number = parseInt(e.target.value) || 0;
    setNumCandidates(number);
    setCandidates(Array(number).fill({ name: '', description: '' }));
  };

  const handleCandidateChange = (index, field, value) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
    setCandidates(updatedCandidates);
  };


  const createWeb3Election = async (electionData) => {
    try {
      if (typeof window.ethereum === "undefined") {
        console.error("MetaMask is not installed.");
        //alert("MetaMask is not installed. Please install it to continue.")
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const electionContract = new ethers.Contract(contractAddress, ElectionABI, signer);

      const { electionName, club, startTime, endTime } = electionData;
      const description = electionData.candidates.map(c => `${c.name}: ${c.description}`).join('\n');
      const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

      const tx = await electionContract.createElection(electionName, description, club, startTimestamp, endTimestamp);
      await tx.wait();
      console.log("Election created on blockchain:", tx.hash);
      return tx.hash; 
    } catch (error) {
      console.error("Error creating election on blockchain:", error);
      alert("Error creating election on blockchain. Please check the console for details.");
      throw error; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const electionData = {
      electionName,
      numCandidates,
      candidates,
      startTime,
      endTime,
      club,
    };

    try {
      const response = await axios.post('http://localhost:8081/elections', electionData);
      console.log('Election created in backend:', response.data);
      //const txHash = await createWeb3Election(electionData);
      //electionData.txHash = txHash;
      setElectionData(electionData);
      navigate('/generalElectionPage');
    } catch (error) {
      console.error('Error creating election:', error);
    }
  };

  // ... (JSX remains the same from the previous enhanced Tailwind CSS example)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-200 flex justify-center items-center">
           <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
             <h2 className="text-2xl font-semibold text-center mb-4 text-purple-800">Create New Election</h2>
             <form onSubmit={handleSubmit} className="space-y-4">
    
    
               <div>
                 <label htmlFor="electionName" className="block text-sm font-medium text-gray-700">
                   Name of the Election:
                  </label>
                  <input
                  type="text"
                  id="electionName" // Added id for accessibility
                  value={electionName}
                  onChange={(e) => setElectionName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
    
              <div> {/* Number of Candidates */}
                <label htmlFor="numCandidates" className="block text-sm font-medium text-gray-700">
                  Number of Candidates:
                </label>
                <input
                  type="number"
                  id="numCandidates"
                  value={numCandidates}
                  onChange={handleNumCandidatesChange}
                  min="0"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
    
              {Array.from({ length: numCandidates }).map((_, index) => (
                <div key={index} className="mb-4">  {/* Candidate information */}
                  <label htmlFor={`candidateName${index}`} className="block text-sm font-medium text-gray-700">
                    Candidate {index + 1} Name:
                  </label>
                  <input
                    type="text"
                    id={`candidateName${index}`}
                    value={candidates[index]?.name || ''}
                    onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <label htmlFor={`candidateDescription${index}`} className="block text-sm font-medium text-gray-700 mt-2">
                    Candidate {index + 1} Description:
                  </label>
                  <textarea
                    id={`candidateDescription${index}`}
                    value={candidates[index]?.description || ''}
                    onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              ))}
    
    
               <div> {/* Start Time */}
               <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time:</label>
                <input
                   type="datetime-local"
                    id="startTime"
                  value={startTime}
                   onChange={(e) => setStartTime(e.target.value)}
                    required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                 />
              </div>
    
              <div> {/* End Time */}
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time:</label>
                 <input
                   type="datetime-local"
                    id="endTime"
                   value={endTime}
                   onChange={(e) => setEndTime(e.target.value)}
                   required
                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>
    
              {/* <div> {/* Club 
                <label htmlFor="club" className="block text-sm font-medium text-gray-700">Club:</label>
                 <textarea
                   id="club"
                   value={club}
                   onChange={(e) => setClub(e.target.value)}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
               </div> */}
                <div> {/* Club Dropdown */}
            <label htmlFor="club" className="block text-sm font-medium text-gray-700">Club:</label>
            <select
              id="club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a Club</option> {/* Default option */}
              {clubs.map((clubName) => (
                <option key={clubName} value={clubName}>
                  {clubName}
                </option>
              ))}
            </select>
          </div>
    
    
    
              <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Create Election
              </button>
            </form>
          </div>
        </div>
      );


}


export default Home;