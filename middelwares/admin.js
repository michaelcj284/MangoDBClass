const jwt = require("jsonwebtoken")

const admin = async (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        if(decode.admin){
            console.log(decode)
            req.user = decode
            next()
        } else {
            res.status(403).send("Access denied")
        }
        
    } catch(err) {
        res.status(403).send("Invalid token")
    }
}

module.exports = admin