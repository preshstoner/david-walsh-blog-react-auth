const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    //Read the JWT access token from the request header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split("")[1];
    if (token == null) return res.sendStatus(401);
    //Return 401 if no token 
    //Verify the token using the Userfront public key
    jwt.verify(token, process.env.USERFRONT_PUBLIC_KEY, (err, auth) => {
        if (err) return res.sendStatus(403); //Return 403 if there is an error verifying
        req.auth = auth;
        next();
    });
}

authenticateToken(); 