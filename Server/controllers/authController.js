const mysql = require("mysql")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const db = mysql.createConnection({
    host: "localhost",
    user : "root",
    "password":"",
    database:"VOTING_PROJECT"
})


const signup = async (req, res) => {
    try {
        //console.log("Inside the sigup ",req)
        const { username, email, password, walletId, department, clubs } = req.body;

        console.log("Printing the request data:", req.body);

        // SQL query to check if the user already exists
        const findUserQuery = "SELECT * FROM users WHERE email = ?";
        db.query(findUserQuery, [email], async (error, results) => {
            if (error) {
                console.log("Error checking for existing user:", error);
                return res.status(500).json({
                    message: "Database error occurred",
                    success: false
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    message: "User already exists",
                    success: false
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // SQL query to insert the new user
            const insertUserQuery = `
                INSERT INTO users (username, email, password, wallet_id, department, clubs) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            // Clubs can be stored as a JSON string or a delimited string
            const clubsString = JSON.stringify(clubs);

            db.query(insertUserQuery, [username, email, hashedPassword, walletId, department, clubsString], (insertError, insertResults) => {
                if (insertError) {
                    console.log("Error saving new user:", insertError);
                    return res.status(500).json({
                        message: "Error saving user to the database",
                        success: false
                    });
                }

                console.log("New user created successfully:", insertResults);
                return res.status(201).json({
                    message: "Sign up successfully",
                    success: true
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


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errMsg = "Authentication failed, email or password is wrong";

        console.log("Printing the request data:", req.body);

        // SQL query to find the user by email
        const findUserQuery = "SELECT * FROM users WHERE email = ?";
        db.query(findUserQuery, [email], async (error, results) => {
            if (error) {
                console.log("Database error while finding user:", error);
                return res.status(500).json({
                    message: "Database error",
                    success: false,
                    error
                });
            }

            if (results.length === 0) {
                return res.status(403).json({
                    message: errMsg,
                    success: false
                });
            }

            const findUser = results[0];

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, findUser.password);
            if (!isMatch) {
                return res.status(403).json({
                    message: errMsg,
                    success: false
                });
            }

            // Generate a JWT token
            const token = jwt.sign(
                { email: findUser.email, id: findUser.id },
                process.env.JWT_SECRET,
                { expiresIn: '2d', issuer: 'Voting app' }
            );

            console.log("Token created successfully:", token);

            // Respond with user details and token
            return res.status(200).json({
                message: "Login successful",
                email: findUser.email,
                token,
                name: findUser.username,
                department: findUser.department,
                isAdmin: findUser.is_admin, // Assuming SQL column is named `is_admin`
                clubs: JSON.parse(findUser.clubs || "[]"), // Parse clubs if stored as JSON string
                walletId: findUser.wallet_id, // Assuming SQL column is `wallet_id`
                success: true
            });
        });
    } catch (error) {
        console.log("Error logging in:", error);
        return res.status(500).json({
            message: "Error logging in",
            success: false,
            error
        });
    }
};


module.exports = {
    signup,
    login
}