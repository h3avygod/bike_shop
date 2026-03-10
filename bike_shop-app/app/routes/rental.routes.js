const { rental } = require("../models/index.js");
module.exports = (app) => {
  const rental = require("../controllers/rental.controller.js");
  var router = require("express").Router();

  router.post("/", rental.create);
  router.get("/", rental.findAll);
  router.get("/:id", rental.findOne);
  router.put("/:id", rental.update);
  router.delete("/:id", rental.delete);
  router.delete("/", rental.deleteAll);
  //доп методы
  router.get("/:id/clientfullname", rental.getClientFullName);
  router.get("/:id/tariff", rental.getTariff);
  router.get("/:id/totalcost", rental.getTotalCost);

  app.use("/api/rental", router);
  console.log("Router for /api/rental initialized");
};
