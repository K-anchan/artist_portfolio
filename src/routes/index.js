
const authRouter = require('./route')

const express = require("express")
console.log(11111);
const route = express.Router();

route.use("/user/", authRouter)



module.exports = route;