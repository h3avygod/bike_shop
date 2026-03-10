const { where } = require("sequelize");
const db = require("../models");
const Bicycle = db.bicycle;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.model ||
    !req.body.manufacturer ||
    !req.body.frame_number ||
    !req.body.id_category ||
    !req.body.status
  ) {
    res
      .status(400)
      .send({
        message:
          "Model, manufacturer, frame_number, category and status are required",
      });
    return;
  }

  const bicycle = {
    model: req.body.model,
    manufacturer: req.body.manufacturer,
    frame_number: req.body.frame_number,
    id_category: req.body.id_category,
    frame_size: req.body.frame_size,
    brake_type: req.body.brake_type,
    gear_count: req.body.gear_count,
    year: req.body.year,
    status: req.body.status,
  };

  Bicycle.create(bicycle)
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error creating Bicycle" }),
    );
};

exports.findAll = (req, res) => {
  const model = req.query.model;
  const condition = model ? { model: { [Op.iLike]: `%${model}%` } } : null;

  Bicycle.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error retrieving Bicycles" }),
    );
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Bicycle.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Bicycle with id=${id} not found` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error retrieving Bicycle with id=" + id }),
    );
};

exports.update = (req, res) => {
  const id = req.params.id;
  Bicycle.update(req.body, { where: { id_bicycle: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Bicycle updated successfully" });
      else res.send({ message: `Cannot update Bicycle with id=${id}` });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error updating Bicycle with id=" + id }),
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Bicycle.destroy({ where: { id_bicycle: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Bicycle deleted successfully" });
      else res.send({ message: `Cannot delete Bicycle with id=${id}` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Could not delete Bicycle with id=" + id }),
    );
};

exports.deleteAll = (req, res) => {
  Bicycle.destroy({ where: {}, truncate: false })
    .then((nums) =>
      res.send({ message: `${nums} Bicycles deleted successfully` }),
    )
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error deleting Bicycles" }),
    );
};
