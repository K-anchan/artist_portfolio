const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtInfo = require("../config/jwtSecret")
const db = require("../models/index")
const dotenv = require("dotenv")
dotenv.config()
// const AWS = require('aws-sdk')
const fs = require("fs");
const path = require('path')


let refreshTokens = [];
var generalFunction = {
    nameGenerate: () => {
        return Math.random().toString(36).substring(2, 15)
    },
    generatePassword: (data) => {
        return new Promise((resolve, reject) => {
            bcrypt.hash(data, 10, function (err, hash) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(hash);
                }
            });
        });
    },
    comparePassword: (oldPass, password) => {
        return bcrypt.compareSync(oldPass, password);
    },
    signJwtAccessToken: (isUserVerified) => {
        // console.log("isUserVerified : ", isUserVerified);
        const payload = {
            user_id: isUserVerified.id,
            email: isUserVerified.email || null,
        }
        const token = jwt.sign(payload, jwtInfo.jwtSecretKey);
        console.log("token in sing : ", token);
        return token
    },

    saveMediaLocally: async (base64, mediaType = 'image') => {
        try {
            // Remove the MIME type prefix from the base64 string
            const base64Data = Buffer.from(
                base64.replace(/^data:(image|video)\/\w+;base64,/, ""),
                "base64"
            );

            // Determine file type and extension
            const type = base64.split(";")[0].split("/")[1]; // E.g., 'png', 'jpg', 'mp4'

            // Define file path (e.g., to a 'uploads' folder)
            const folderPath = path.join(__dirname, 'uploads'); // Change 'uploads' to your desired directory
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath); // Create the uploads folder if it doesn't exist
            }

            const fileName = `${Date.now()}_media.${type}`;
            const filePath = path.join(folderPath, fileName);

            // Save the file
            fs.writeFileSync(filePath, base64Data);

            console.log("File saved locally:", filePath);
            return filePath; // Return the path if you need to use it later
        } catch (error) {
            console.error("Error saving media locally:", error);
            return null;
        }
    }
}






module.exports = generalFunction