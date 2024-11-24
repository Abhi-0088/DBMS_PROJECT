// routes/electionRoutes.js
const express = require("express");
const { createElection, getAllElections,getElectionById } = require("../controllers/electionController");

const router = express.Router();

router.post("/elections", createElection);  // Endpoint to create a new election
router.get("/elections", getAllElections);  // Endpoint to get all elections
router.get('/elections/:electionId', getElectionById);

module.exports = router;
