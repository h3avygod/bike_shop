const { where } = require("sequelize");
const db = require("../models");
const Rental = db.rental;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.id_client ||
    !req.body.id_tariff ||
    !req.body.start_datetime ||
    !req.body.planned_end_datetime ||
    !req.body.status
  ) {
    res
      .status(400)
      .send({
        message:
          "Client, tariff, start time, planned end time and status are required",
      });
    return;
  }

  const rental = {
    id_client: req.body.id_client,
    id_tariff: req.body.id_tariff,
    start_datetime: req.body.start_datetime,
    planned_end_datetime: req.body.planned_end_datetime,
    actual_end_datetime: req.body.actual_end_datetime,
    total_amount: req.body.total_amount,
    status: req.body.status,
  };

  Rental.create(rental)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || "Error creating Rental" }),
    );
};

exports.findAll = (req, res) => {
  const status = req.query.status;
  const condition = status ? { status: { [Op.iLike]: `%${status}%` } } : null;

  Rental.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error retrieving Rentals" }),
    );
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Rental.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Rental with id=${id} not found` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error retrieving Rental with id=" + id }),
    );
};

exports.update = (req, res) => {
  const id = req.params.id;
  Rental.update(req.body, { where: { id_rental: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Rental updated successfully" });
      else res.send({ message: `Cannot update Rental with id=${id}` });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error updating Rental with id=" + id }),
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Rental.destroy({ where: { id_rental: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Rental deleted successfully" });
      else res.send({ message: `Cannot delete Rental with id=${id}` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Could not delete Rental with id=" + id }),
    );
};

exports.deleteAll = (req, res) => {
  Rental.destroy({ where: {}, truncate: false })
    .then((nums) =>
      res.send({ message: `${nums} Rentals deleted successfully` }),
    )
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error deleting Rentals" }),
    );
};
