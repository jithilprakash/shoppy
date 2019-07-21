const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();
const bodyParser = require("body-parser");
const constant = require("./config/constant.json");

const accountRoutes = require("./routes/account.routes");
const geoRoutes = require('./routes/geolocation.routes')

app.use(bodyParser.json());
app.use("/", accountRoutes);
app.use("/geolocation", geoRoutes);

app.listen(constant.PORT, () => {
  console.log(`PORT running at ${constant.PORT}`);
});


//"URL":"mongodb://3.17.135.197:3500",