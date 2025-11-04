const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const PORT = 3000;

function authenticateToken(req, res, next) {
    //Read the JWT access token from the request header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.sendStatus(401);
    }


    //Return 401 if no token 
    //Verify the token using the Userfront public key
    jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
        if (err) {
            return res.sendStatus(403);// Invalid token
        }

        req.auth = auth; //Save decoded token data fro later use
        next(); // Continue to the next middleware or route
    });

}

//Protected Route: Only accessable by admin role
app.get("/users", authenticateToken, (req, res) => {
    const authorization = req.auth.authorization?.["demo1234"] || {};

    if (authorization.roles && authorization.roles.includes("admin")) {
        res.json({ message: "Acesss granted: Welcome admin!" });
    } else {
        res.status(403).json({ message: "Access denied: Admins only." });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
authenticateToken(); 