var express = require("express");
var app = express();
var train = require("./routes/train.js");
var search = require("./routes/search.js");
//var maps = require("./routes/maps.js");

app.set('port', (process.env.PORT || 8000));

app.use(express.static("./public"));

app.use("/search", search);
app.use("/train", train);
//app.use("/maps", maps);


app.listen(app.get("port"), () => console.log(`Listening on port:${app.get('port')}`));
