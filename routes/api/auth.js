require("dotenv").config()

const express = require("express")
const jwt = require("jsonwebtoken")
const Token = require("../../models/auth.model")

const router = new express.Router()

router.post("/login", async(req, res) => {
    // autheticate user

    const name = req.body.name
    const user = { name }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    const token = Token({token: refreshToken})
    await token.save()
    
    res.json({ accessToken, refreshToken })
})

router.post("/token", async(req, res) => {
    const refreshToken = req.body.token
    const tokenExists = await Token.exists({token: refreshToken})
    
    if (!tokenExists) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const payload = { name: user.name }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"})
        return res.json({ accessToken })
    })
})

router.delete("/logout", async(req, res) => {
    const refreshToken = req.body.token
    const token = await Token.findOneAndDelete({token: refreshToken})
    res.sendStatus(204)
})

module.exports = router
