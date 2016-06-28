var express = require("express");
var app = express();
var train = require("./routes/train.js");
var route = require("./routes/route.js");
var schedule = require("./data/schedule.js").data;


app.get("/", function(req, res) {

  res.send("Please use the assigned endpoints of the api");
});
app.use("/train", train);
app.use("/route", route);
app.use(express.static("public"));

app.listen(8000, () => console.log("Listening on port 8000"));
