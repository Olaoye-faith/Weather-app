const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");

const app = express();
app.use(bodyparser.urlencoded({extended:true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=4684e28060d25a0cedcb8cde52bfc7c1&units=metric"
    https.get(url, function(response){
        console.log(response);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<h1>The Temperature in "+ query +" is " + temp + " degrees celcius</h1>")
            res.write("<img src =" + imageURL + ">")
            res.send();
        })
    })
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})
