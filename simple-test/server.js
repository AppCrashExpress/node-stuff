const express = require("express");
const app = express();

const port = 8080;

app.get("/", (req, res) => {
    res.send("<h1>PLACEHOLDER H1 HEADER</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<p>Contant information</p>");
});

app.get("/about", (req, res) => {
    res.send("<p>About information</p>");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
