const express = require("express");
const bParser = require("body-parser");

const PORT = 8080;
let   taskList = [];

const app = express();
app.set("view engine", "ejs");
app.use( bParser.urlencoded({extended: true}) );
app.use( express.static("public") );

function getDay() {
    const dayArray = [
        "Sunday",
        "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const now = new Date();
    return dayArray[now.getDay()];
};

function getDate() {
    const options = {
        weekday: "long",
        day:     "numeric",
        month:   "long"
    };
    
    let date = new Date();
    return date.toLocaleDateString("en-US", options);
};

app.get("/", (req, res) => {
    res.render("todo-list", { listTitle: getDate(), taskList: taskList });
});

app.get("/about", (req, res) => {
    res.render("about", { listTitle: getDate(), taskList: taskList });
});

app.post("/", (req, res) => {
    let newTask = req.body.taskInput;
    taskList.push(newTask);
    res.redirect("/");
    console.log(`SERVER: user posted task: ${newTask}`);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
