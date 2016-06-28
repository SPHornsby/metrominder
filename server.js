var express = require("express");
var app = express();

var schedule = require("./data/schedule.js").data;
app.get("/", function(req, res) {
  res.send(schedule[0].stops);
});
app.use(express.static("public"));

app.listen(8000, () => console.log("Listening on port 8000"));
