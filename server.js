const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const route = require('./src/routes/index')
const db = require('./src/models/index');

// console.log(db, 11155)

const app = express();

const PORT = process.env.PORT || 3001;

console.log("hi")

//CORS POLICY
app.use(cors())

//BODY PARSER_ERROR
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.status(200).send({
        app: "Welcome to Demo Node...!!!!!", message: "Server is UP and Running :)"
    })
});

app.use("/api", route);

app.use((req, res) =>
    res.status(404).json({
        status: false,
        message: 'Route does not exist'
    }
    ))

app.listen(PORT, () => {
    console.log(`connected to server on:http://localhost:${PORT}`);
})









