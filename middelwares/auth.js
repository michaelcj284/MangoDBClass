const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).send("Access denied. No token provided");
    }

    //middleware
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        console.log(decode);
        next();
    }catch(err){
        res.status(400).send("Invalid token");
    }
    
};


module.exports = auth;