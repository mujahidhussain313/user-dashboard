
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./DB/conn");
const Users = require("./models/UserSchema");
const router = require("./roots/router");
const app = express();

app.use(cors());
app.use(express.json());

app.use(router);


const port = 8000;



app.listen(port, ()=>{
    console.log(`app is running on port ${port}`)
})