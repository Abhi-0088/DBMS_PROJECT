// routes/electionRoutes.js
const express = require("express");
const { createElection, getAllElections,getElectionById,increaseVoteCount } = require("../controllers/electionController");

const router = express.Router();

router.post("/elections", createElection);  // Endpoint to create a new election
router.get("/elections", getAllElections);  // Endpoint to get all elections
router.get('/elections/:electionId', getElectionById);
router.post("/elections/increaseVoteCount",increaseVoteCount);

module.exports = router;
