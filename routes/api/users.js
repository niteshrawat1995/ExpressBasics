const express = require("express")

const User = require("../../models/user.model")

const router = new express.Router()

router.get("/", async(req, res) => {
    const users = await User.find({})
    return res.json(users)
})

module.exports = router