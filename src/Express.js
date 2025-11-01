const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    //Read the JWT access token from the request header
    const authHeader = req.headers["authorization"];
}