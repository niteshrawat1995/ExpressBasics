const express = require("express")
const mongodb = require("mongodb")

const User = require("../../models/user.model")

const router = new express.Router()
const ObjectID = mongodb.ObjectID

router.get("/", async(req, res) => {
    const users = await User.find({})
    return res.json(users)
})

router.post("/", async(req, res) => {
    const user = new User(...req.body)
    try{
        dbUser = await user.save()
        return res.json(dbUser)
    }
    catch(e){
        const err_msg = `Unable to save user | error ${e}` 
        console.error(err_msg)
        return res.status(500).json({error: err_msg})
    }
})

// detail
router.get("/:id", async(req, res) => {
    const { id: userId } = req.params
    if (! ObjectID.isValid(userId)) return res.status(400).json({msg: "Bad id format"})
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({msg: "details not found"}) 
    return res.json(user)
})

// update
router.put("/:id", async(req, res) => {
    const { id: userId } = req.params
    if (! ObjectID.isValid(userId)) return res.status(400).json({msg: "Bad id format"})
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({msg: "details not found"})
    
    const { name, email, password } = req.body
    user.name = name ? name : user.name
    user.email = email ? email : user.email
    user.password = password ? password : user.password

    await user.save()
    const refreshedUser = await User.findById(userId)
    res.json(refreshedUser)
})

// delete
router.delete("/:id", async(req, res) => {
    const { id: userId } = req.params
    if (! ObjectID.isValid(userId)) return res.status(400).json({msg: "Bad id format"})
    deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) return res.status(404).json({msg: "details not found"})
    return res.json({ status: "deleted", deletedUser})
})

module.exports = router