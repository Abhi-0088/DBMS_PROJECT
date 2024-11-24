import React from 'react';
import { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import CreateElection from './components/CreateElection';
import VotingPage from './components/VotingPage';
import GeneralElectionPage from './components/GeneralElectionPage';
import SignupPage from './components/Signup';
import Login from "./components/Login"
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';

function App() {
    const [electionData, setElectionData] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const Navigate = useNavigate

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      console.log(" Insdie the app.js",JSON.parse(storedUser))
      if (storedUser) {
        console.log("got user stored user")
          setUser(JSON.parse(storedUser));
      }
      setLoading(false)
  }, []);
  if (loading) {
    // Show a loading screen while checking localStorage
    return <div>Loading...</div>;
}
  return (
    <Router>
      <div>
        <Routes>
        
        <Route path="/" element={<Home/>} /> 
          <Route path="/login" element={<Login setUser={setUser}/>} />
          
          <Route path="/signup" element={<SignupPage />} />
          {/* <Route path="/dashboard" element={<Dashboard user={user} />} />
           <Route path="/clubmanagement" element={user?.isAdmin ? <ClubManagement /> : <Navigate to="/login" />} /> */}
           {/* <Route path="/createElection" element={user?.isAdmin ? <CreateElection setUser={setUser} /> : <Navigate to="/login" />} /> */}
          <Route path="/generalElectionPage" element={<GeneralElectionPage user={user} setUser={setUser}/>} />
          <Route
            path="/createElection"
            element={
              <ProtectedRoute user={user}>
                <CreateElection setElectionData={setElectionData} />
              </ProtectedRoute>
              }
          />
          <Route path="/voting/:electionId" element={<VotingPage />} />

          <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" replace />}
          />
          {/* <Route path="/voting" element={<Voting electionData={electionData} />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
