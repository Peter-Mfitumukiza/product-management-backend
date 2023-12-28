const jwt = require("jsonwebtoken");
const dbService = require("../services/dbService");
const paramUtil = require("../utils/paramUtil");

async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        try {
            let pList = paramUtil.Parse({
                "in@p_email": email
            });

            dbService.common_db_call("usp_get_user_by_email", pList, (err, result) => {
                if (err) {
                    console.log("data service error: " + err.message);
                    resolve(null); // Resolve with null in case of an error
                }
                resolve(result); // Resolve with the result
            });
        } catch (error) {
            reject(error); // Reject with the error
        }
    });
}

async function verifyToken(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: "Access denied log in first!" });
        
        token =  token.split(' ')[1];
        if (!token) return res.status(401).json({ error: "Access denied log in first!" });
        
        req.user = jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        // console.error('Error verifying token:', error);
        res.status(401).json({ error: "Invalid Token!" });
    }

}

module.exports.getUserByEmail = getUserByEmail;
module.exports.verifyToken = verifyToken;