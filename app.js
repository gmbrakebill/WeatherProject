const express = require('express')
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
//api call
//req = request
//res = response
app.get("/", function(req, res){
 res.sendFile(__dirname + "/index.html")

})

app.post("/", function(req,res){
  
  const query = req.body.cityName;
const apiKey = "fbc8c5d7cadc96e61fb83b22ef94d4d8"
const unit = "imperial";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query+ "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        console.log(response.statusCode)

        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
          
            const temp = weatherData.main.temp;        
            const weatherDescription = weatherData.weather[0].description;  
            const weatherIcon = weatherData.weather[0].icon;
           
            const imgURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

           

            res.write("<h1>The temp in " + query + " is " + temp + " degrees Farenheit</h1>")
            res.write("The weather is currently " + weatherDescription);
            res.write("<img src ="+ imgURL + ">")
            res.send();
        })
    })
})






app.listen(3000, function() {
    console.log("server running on 3000")
})