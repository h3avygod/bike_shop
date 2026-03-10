const { client } = require("../models/index.js");
module.exports = (app) => {
  const client = require("../controllers/client.controller.js");
  var router = require("express").Router();

  router.post("/", client.create);
  router.get("/", client.findAll);
  router.get("/:id", client.findOne);
  router.put("/:id", client.update);
  router.delete("/:id", client.delete);
  router.delete("/", client.deleteAll);
  //доп методы
  router.get("/:id/rentals", client.getClientRentals);

  app.use("/api/client", router);
  console.log("Router for /api/client initialized");
};
