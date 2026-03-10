const { rentalItem } = require("../models/index.js");
module.exports = (app) => {
  const rentalItem = require("../controllers/rental_item.controller.js");
  var router = require("express").Router();

  router.post("/", rentalItem.create);
  router.get("/", rentalItem.findAll);
  router.get("/:id", rentalItem.findOne);
  router.put("/:id", rentalItem.update);
  router.delete("/:id", rentalItem.delete);
  router.delete("/", rentalItem.deleteAll);

  app.use("/api/rentalItem", router);
  console.log("Router for /api/rentalItem initialized");
};
