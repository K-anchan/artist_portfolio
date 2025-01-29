
const jwt = require("jsonwebtoken");
const jwtInfo = require("../config/jwtSecret");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (req.headers["authorization"]) {
        const authParts = req.headers["authorization"].split(" ");
        if (authParts[0] === "Bearer" || authParts[0] === "Token") {
            token = authParts[1];
        }
    }

    if (!token) {
        return res.status(401).send("A token is required for authentication");
    }

    try {
        // Check for the bypass token if you need it
        if (token === "8v0BuZBsHHmsb1Qtvo4yrzVboPLzw9voP04nceCuDW7") {
            return next();
        }

        // Use jwtInfo.jwtSecretKey as the secret key
        const decoded = jwt.verify(token, jwtInfo.jwtSecretKey);
        req.user = decoded;
        // req.user_id = decoded.user_id
        return next();
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(401).send("Invalid token");
    }
};

const authJwt = {
    verifyToken,
};

module.exports = authJwt;
