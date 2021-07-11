const express = require("express")
const members = require("../../data")
const uuid = require("uuid")

const router = express.Router()
// List
router.get("/", (req, res) => res.json(members))
// Detail
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    member = members.filter(member => member.id === id)
    if(member.length == 0) return res.status(404).json({error: "Details not found"})
    else res.json(member)
})
// Create
router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        ...req.body
    }
    console.log(newMember)
    // validate data
    if(!newMember.name || !newMember.age){
        return res.status(400).json({error: "Name or age is not send!"})
    }
    members.push(newMember)
    return res.json(members)
    
})
// Update
router.put("/:id", (req, res) => {
    // fetch obj
    const id = parseInt(req.params.id)
    member = members.filter(member => member.id === id)
    if(member.length == 0) return res.status(404).json({error: "Details not found"})
    else {
        member = member[0]
        member.name = req.body.name ? req.body.name : member.name
        member.age = req.body.age ? req.body.age : member.age
        return res.json([member])
    }
})

// Delete
router.delete(":/id", (req, res) => {
    // fetch obj
    const id = parseInt(req.params.id)
    member = members.filter(member => member.id === id)
    if(member.length == 0) return res.status(404).json({error: "Details not found"})
    else{
        res.json({"msg": "Member deleted"})
    }
})

module.exports = router