const express = require("express");
const https   = require("https");
const bParser = require("body-parser");

const app = express();
app.use( bParser.urlencoded({extended: true}) );

const PORT = 8080;

app.get("/", (req, res) => {
    console.log("SERVER: Recieved request on root");
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const url = "https://api.openweathermap.org/data/2.5/weather" +
        "?q=" + req.body.cityName +
        "&units=metric" +
        "&appid=c5c07a8b5e49fb7fe3f394500afeffd5";

    https.get(url, (urlRes) => {
        console.log("API: statusCode: " + urlRes.statusCode);

        let rawData = '';
        
        urlRes.on('data', (data) => {
            rawData += data;
        });
        
        let parsedData = '';

        urlRes.on('end', () => {
            parsedData = JSON.parse(rawData);
            let {weather: [{description: wDesc, icon: wIcon}], main: {temp}} = parsedData;
            res.write(`<p>It is currently ${temp} celsius.</p>`);
            res.write(`<p>The weather is ${wDesc}.</p>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${wIcon}@2x.png">`);
            res.send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`SERVER: Listening on port ${PORT}`);
});
