const { where } = require("sequelize");
const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty" });
    return;
  }

  const category = {  
    name: req.body.name,
    description: req.body.description,
  };

  Category.create(category)
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error creating Category" });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Category.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error retrieving Categories" });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else
        res.status(404).send({ message: `Category with id=${id} not found` });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Category with id=" + id });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Category.update(req.body, { where: { id_category: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Category updated successfully" });
      else
        res.send({
          message: `Cannot update Category with id=${id}. Maybe not found or empty body`,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error updating Category with id=" + id });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Category.destroy({ where: { id_category: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Category deleted successfully" });
      else
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe not found`,
        });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Could not delete Category with id=" + id });
    });
};

exports.deleteAll = (req, res) => {
  Category.destroy({ where: {}, truncate: false })
    .then((nums) =>
      res.send({ message: `${nums} Categories deleted successfully` }),
    )
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error deleting Categories" });
    });
};

exports.getCategoryTariffs = (req, res) => {
  const id = req.params.id;

  db.sequelize.query(
    'SELECT t.* FROM "Tariff" t LEFT JOIN "Category" c ON t.id_category = c.id_category WHERE c.id_category = :id',
    {
      replacements: { id: id },
      type: QueryTypes.SELECT,
      model: db.tariff,
      mapToModel: true
    }
  )
  .then(result => {
    res.send(result || []);
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Error getting category tariffs" });
  });
};