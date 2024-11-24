const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require("body-parser")
require('dotenv').config()

const port = process.env.PORT || 5000

const auth_Router = require("./routes/authRoutes")
const election_Router = require("./routes/electionRoutes")

const app = express()

app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    "password":"",
    database:"assignment2"
})

app.get('/',(req,res)=>{
    return res.json('From Backend Side')
})

app.use("/",auth_Router)
app.use("/",election_Router)
app.listen(port,()=> {
    console.log(`PORT STARTED AT ${port}`)
})