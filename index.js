const express = require("express")
const bodyparser = require("body-parser")
const db = require("./db")
const app = express()
tasksRoute = require("./controller/users.controller")

// middleware
    // Make Use of the body-parser package
app.use(bodyparser.json())

app.use('/mhealth-api/users', tasksRoute)


// To Check if the database is actually connected or not since there is no way of checking before creating the pool
db.query("Select 1")
.then(() => {console.log("DB connection successful")
    // Start server
    app.listen(3000, 
        () => console.log("mhealth_app express server started at port 3000"))
})
.catch(e => console.log(e + "DB connection unsuccessful"))


