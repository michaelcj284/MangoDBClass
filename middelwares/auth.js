const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).send("Access denied. No token provided");
    }

    //middleware
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decode;
    console.log(decode);
    next();
};


module.exports = auth;