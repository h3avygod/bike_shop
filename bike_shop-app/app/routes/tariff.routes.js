const { tariff } = require("../models/index.js");
module.exports = (app) => {
  const tariff = require("../controllers/tariff.controller.js");

  var router = require("express").Router();

  router.post("/", tariff.create);
  router.get("/", tariff.findAll);
  router.get("/:id", tariff.findOne);
  router.put("/:id", tariff.update);
  router.delete("/:id", tariff.delete);
  router.delete("/", tariff.deleteAll);

  app.use("/api/tariff", router);
  console.log("Router for /api/tariff initialized");
};
