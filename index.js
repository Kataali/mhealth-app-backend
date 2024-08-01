
const express = require("express");
const bodyparser = require("body-parser");
const db = require("./db");
const cors = require("cors");
usersRoute = require("./controller/users.controller");
modelRoute = require("./controller/model.controller");
medsRoute = require("./controller/medication.controller");

// App config
const app = express();

// middleware config
    // Make Use of the body-parser package
app.use(bodyparser.json());
app.use(cors());
app.use('/mhealth-api/users', usersRoute);
app.use('/mhealth-api/disease', modelRoute);
app.use('/mhealth-api/meds', medsRoute);

// To Check if the database is actually connected or not since there is no way of checking before creating the pool
db.query("Select 1")
.then(() => {console.log("DB connection successful")
    // Start server
    app.listen(3000, 
        () => console.log("mhealth_app express server started at port 3000"))
})
.catch(e => console.log(e + "DB connection unsuccessful"));


