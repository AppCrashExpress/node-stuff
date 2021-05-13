const express = require("express");
const bParser = require("body-parser");
const https   = require("https");

const apiKey = "61b1e6c2b6f5e31152c6c1103a1034d5-us17";
const listID = "7b1ed1d156";
const PORT = 8080;

const app = express();
app.use( bParser.urlencoded({extended: true}) );
app.use( express.static("public") );

app.get("/", (req, res) => {
    console.log("SERVER: request on root recieved");
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const {inputName: name, inputSurname: surname, inputEmail: email} = req.body;

    const apiData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {FNAME: name, LNAME: surname}
            }
        ]
    };

    const url = "https://us17.api.mailchimp.com/3.0/lists/" + listID;
    const options = {
        method: "POST",
        auth: "anyUsername:" + apiKey
    };
    const mailReq = https.request(url, options, (urlRes) => {
        if (urlRes.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        let rawData = '';
        urlRes.on("data", (newData) => {
            rawData += newData;
        });
        urlRes.on("end", () => {
            // console.log("MAILCHIMP:\n", JSON.parse(rawData));
        });
    });
    
    mailReq.write(JSON.stringify(apiData));
    mailReq.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
