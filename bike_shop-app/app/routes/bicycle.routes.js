const { bicycle } = require("../models/index.js");
module.exports = (app) => {
  const bicycle = require("../controllers/bicycle.controller.js");
  var router = require("express").Router();

  router.post("/", bicycle.create);
  router.get("/", bicycle.findAll);
  router.get("/:id", bicycle.findOne);
  router.put("/:id", bicycle.update);
  router.delete("/:id", bicycle.delete);
  router.delete("/", bicycle.deleteAll);
  router.get("/:id/categoryname", bicycle.getCategoryName);

  app.use("/api/bicycle", router);
  console.log("Router for /api/bicycle initialized");
};
