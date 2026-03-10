const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");
require("dotenv").config();
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to trade-app application." });
});
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;



//роутеры
require("./app/routes/category.routes")(app);
require("./app/routes/bicycle.routes.js")(app);
require("./app/routes/client.routes")(app);
require("./app/routes/tariff.routes")(app);
require("./app/routes/rental.routes")(app);
require("./app/routes/rental_item.routes")(app);

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}.`);
});