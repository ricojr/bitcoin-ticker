const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html"); 
});

app.post("/", (req, res) => {
   // console.log(req.body.crypto);

   var crypto = req.body.crypto;
   var fiat = req.body.fiat;
   var amount = req.body.amount;

   var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";
  

   var options = {
        url:baseUrl,
        method: "get",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount

        }
   };

   request(options, (error, response, body) => {
   // will parse(or turn into) the data into json file
   var data = JSON.parse(body);
   var price = data.price;
   console.log(price); 
   var currentDate = data.time;
   

   res.write("<p>The current date is " + currentDate + "</p>");
   res.write("<h1>" + amount  + crypto + " is currently worth " + price + fiat + " </h1>")

    res.send(); // will send data into the browser
   // console.log("The price of bitcoin is: ", price)
   })
   
});

app.listen(3000, () => {
    console.log("Server running on port 3000.");
}); 