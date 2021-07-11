const express = require("express")

const logger = require("./middlewares/logger")

const app = express()

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

// listen server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server started at ${PORT}`))
