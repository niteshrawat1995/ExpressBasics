require("dotenv").config()
const express = require("express")

const logger = require("./middlewares/logger")
const User = require("./models/user.model")
const app = express()

const PORT = process.env.PORT || 5000

// connect to mongodb
const mongoose = require("mongoose")
const uri = "mongodb+srv://nitesh:dPEyNpb6hPLH3Lir@cluster0.k9ros.mongodb.net/express-basics?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("connected to db")
        // listen server
        app.listen(PORT, () => console.log(`server listening at ${PORT}`))
    })
    .catch(err => console.error(err))

// middlewares
// init 
app.use(logger)
// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// middlewares ends

// routes
app.get("/", (req, res) => res.send("Hello world!!"))
app.use("/api/members", require("./routes/api/members"))
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"))

// mongoose sandbox
app.get("/add-user", async(req, res) => {
    const user = new User({
        name: "john",
        email: "john@gmail.com",
        password: "password@123"
    })
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
