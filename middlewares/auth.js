require("dotenv").config()
const jwt = require("jsonwebtoken")


const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    const accessToken = authorizationHeader && authorizationHeader.split(" ")[1]

    if(!accessToken) return res.sendStatus(401)

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = auth
