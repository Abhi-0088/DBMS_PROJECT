const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    "password":"",
    database:"VOTING_PROJECT"
})

exports.createElection = async (req, res) => {
    console.log("Create Election called");
    try {
        const { electionName, numCandidates, candidates, startTime, endTime, club } = req.body;

        console.log("Printing the request body:", req.body);

        // Insert into elections table
        const insertElectionQuery = `
            INSERT INTO elections (election_name, num_candidates, start_time, end_time, club)
            VALUES (?, ?, ?, ?, ?)
        `;

        db.query(insertElectionQuery, [electionName, numCandidates, startTime, endTime, club], (error, electionResult) => {
            if (error) {
                console.log("Error saving election:", error);
                return res.status(500).json({
                    message: "Error saving election to the database",
                    success: false,
                    error
                });
            }

            const electionId = electionResult.insertId; // Get the ID of the inserted election

            // Insert candidates into candidates table
            if (candidates && candidates.length > 0) {
                const insertCandidateQuery = `
                    INSERT INTO candidates (election_id, name, description)
                    VALUES ?
                `;

                const candidateValues = candidates.map(candidate => [electionId, candidate.name, candidate.description]);

                db.query(insertCandidateQuery, [candidateValues], (candidateError) => {
                    if (candidateError) {
                        console.log("Error saving candidates:", candidateError);
                        return res.status(500).json({
                            message: "Error saving candidates to the database",
                            success: false,
                            error: candidateError
                        });
                    }

                    return res.status(201).json({
                        message: "Election and candidates created successfully",
                        success: true,
                        electionId
                    });
                });
            } else {
                return res.status(201).json({
                    message: "Election created successfully, no candidates added",
                    success: true,
                    electionId
                });
            }
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};


exports.getAllElections = async (req, res) => {
    try {
        const getAllElectionsQuery = "SELECT * FROM elections";

        db.query(getAllElectionsQuery, (error, results) => {
            if (error) {
                console.log("Error fetching elections:", error);
                return res.status(500).json({
                    message: "Error fetching elections from the database",
                    success: false,
                    error
                });
            }

            return res.status(200).json({
                message: "Elections fetched successfully",
                success: true,
                data: results
            });
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};


exports.getElectionById = async (req, res) => {
    try {
        const electionId = req.params.electionId;
        console.log("Printing election ID:", electionId);

        // Fetch election details
        const getElectionQuery = "SELECT * FROM elections WHERE id = ?";
        db.query(getElectionQuery, [electionId], (error, electionResults) => {
            if (error) {
                console.log("Error fetching election:", error);
                return res.status(500).json({
                    message: "Error fetching election from the database",
                    success: false,
                    error
                });
            }

            if (electionResults.length === 0) {
                return res.status(404).json({
                    message: "Election not found",
                    success: false
                });
            }

            const election = electionResults[0];

            // Fetch candidates for this election
            const getCandidatesQuery = "SELECT * FROM candidates WHERE election_id = ?";
            db.query(getCandidatesQuery, [electionId], (candidateError, candidateResults) => {
                if (candidateError) {
                    console.log("Error fetching candidates:", candidateError);
                    return res.status(500).json({
                        message: "Error fetching candidates from the database",
                        success: false,
                        error: candidateError
                    });
                }

                return res.status(200).json({
                    message: "Election fetched successfully",
                    success: true,
                    data: {
                        ...election,
                        candidates: candidateResults
                    }
                });
            });
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};

exports.increaseVoteCount = async (req, res) => {
    try {
        const candidateId = req.body.candidate_id; // Extract candidate ID from the request parameters
        console.log("priting req:\n",req.body);
        console.log("Increasing vote count for candidate ID:", candidateId);

        // Query to increase the vote count for the specified candidate
        const updateVoteCountQuery = `
            UPDATE candidates
            SET vote_count = vote_count + 1
            WHERE id = ?`;

        db.query(updateVoteCountQuery, [candidateId], (error, result) => {
            if (error) {
                console.log("Error updating vote count:", error);
                return res.status(500).json({
                    message: "Error updating vote count in the database",
                    success: false,
                    error
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Candidate not found",
                    success: false
                });
            }

            return res.status(200).json({
                message: "Vote count increased successfully",
                success: true
            });
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({
            message: "Something went wrong",
            success: false
        });
    }
};
