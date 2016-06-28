var route = require("express").Router();
var schedule = require("../data/schedule").data;

route.get("/", function(req, res) {
  console.log(req.query);
  res.send("route... route");
});

module.exports = route;
