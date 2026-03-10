const { where } = require("sequelize");
const db = require("../models");
const Tariff = db.tariff;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.id_category || !req.body.start_date) {
    res.status(400).send({
      message: "Name, category ID and start date cannot be empty",
    });
    return;
  }

  const tariff = {
    name: req.body.name,
    id_category: req.body.id_category,
    price_per_hour: req.body.price_per_hour,
    price_per_day: req.body.price_per_day,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
  };

  Tariff.create(tariff)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating Tariff",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Tariff.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Tariffs",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tariff.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Tariff with id=${id} not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tariff with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tariff.update(req.body, { where: { id_tariff: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Tariff updated successfully" });
      } else {
        res.send({
          message: `Cannot update Tariff with id=${id}. Maybe not found or request body is empty`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tariff with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tariff.destroy({ where: { id_tariff: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Tariff deleted successfully" });
      } else {
        res.send({
          message: `Cannot delete Tariff with id=${id}. Maybe not found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tariff with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Tariff.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} Tariffs were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting Tariffs",
      });
    });
};
