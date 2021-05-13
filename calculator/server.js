const express = require("express");
const bParser = require("body-parser");

const app = express();
app.use( bParser.urlencoded({ extended: true }) );

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get("/", (req, res) => {
    console.log(`REQUEST: ${req}`);
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    console.log(req.body);
    res.send(`<p>Result: ${Number(req.body.num1) + Number(req.body.num2)}</p>`);
});

app.get("/bmicalculator", (req, res) => {
    console.log("REQUEST: bmicalculator");
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
    console.log(req.body);
    let height = req.body.height;
    let weight = req.body.weight;
    res.send(`BMI result: ${weight / (height * height)}`);
});
