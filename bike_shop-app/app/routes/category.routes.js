const { category } = require("../models/index.js");
module.exports = (app) => {
  const category = require("../controllers/category.controller.js");
  var router = require("express").Router();

  router.post("/", category.create);
  router.get("/", category.findAll);
  router.get("/:id", category.findOne);
  router.put("/:id", category.update);
  router.delete("/:id", category.delete);
  router.delete("/", category.deleteAll);
  //доп методы
  router.get("/:id/tariffs", category.getCategoryTariffs);

  app.use("/api/category", router);
  console.log(
    "Router for /api/category initialized",
  );
};
