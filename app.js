const express =  require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app =  express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res) {
  console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "0f7b3661b3956f361c73e370261e5680";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+units;
  // const url = "http://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=0f7b3661b3956f361c73e370261e5680&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    response.on("data", function(data){
      // console.log(data);
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The Weather Condition in Your location is "+weatherDescription+" Currently</p>");
      res.write("<h1>Your Temperature Currently in "+ query +" is: "+ temp +" degrees Celcius.</h1>");
      res.write("<img src = "+ iconUrl +">");
      res.send();

      // const object = {
      //   name:"spurgeon",
      //   favouriteFood:"biryani"
      // }
      // console.log(JSON.stringify(object));

    });
  });
});



app.listen(3000, function() {
  console.log("Server started at port 3000");
});
