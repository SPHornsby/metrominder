var express = require("express");
var app = express();
var train = require("./routes/train.js");
var search = require("./routes/search.js");
var maps = require("./routes/maps.js");
app.use(express.static("./public"));

app.use("/search", search);
app.use("/train", train);
app.use("/maps", maps);


app.listen(8000, () => console.log("Listening on port 8000"));
