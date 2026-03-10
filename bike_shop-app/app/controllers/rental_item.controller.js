const { where } = require("sequelize");
const db = require("../models");
const RentalItem = db.rentalItem;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.id_rental || !req.body.id_bicycle) {
    res.status(400).send({
      message: "id_rental and id_bicycle are required",
    });
    return;
  }

  const rentalItem = {
    id_rental: req.body.id_rental,
    id_bicycle: req.body.id_bicycle,
    hours_used: req.body.hours_used,
    item_cost: req.body.item_cost,
  };

  RentalItem.create(rentalItem)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating RentalItem",
      });
    });
};

exports.findAll = (req, res) => {
  let condition = {};

  if (req.query.rentalId) {
    condition.id_rental = req.query.rentalId;
  }
  if (req.query.bicycleId) {
    condition.id_bicycle = req.query.bicycleId;
  }

  RentalItem.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving RentalItems",
      });
    });
};

exports.findOne = (req, res) => {
  const rentalId = req.params.rentalId;
  const bicycleId = req.params.bicycleId;

  RentalItem.findOne({
    where: {
      id_rental: rentalId,
      id_bicycle: bicycleId,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `RentalItem not found for rental ${rentalId} and bicycle ${bicycleId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving RentalItem",
      });
    });
};

exports.update = (req, res) => {
  const rentalId = req.params.rentalId;
  const bicycleId = req.params.bicycleId;

  RentalItem.update(req.body, {
    where: {
      id_rental: rentalId,
      id_bicycle: bicycleId,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "RentalItem updated successfully" });
      } else {
        res.send({
          message: `Cannot update RentalItem for rental ${rentalId} and bicycle ${bicycleId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating RentalItem",
      });
    });
};

exports.delete = (req, res) => {
  const rentalId = req.params.rentalId;
  const bicycleId = req.params.bicycleId;

  RentalItem.destroy({
    where: {
      id_rental: rentalId,
      id_bicycle: bicycleId,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "RentalItem deleted successfully" });
      } else {
        res.send({
          message: `Cannot delete RentalItem for rental ${rentalId} and bicycle ${bicycleId}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete RentalItem",
      });
    });
};

exports.deleteAll = (req, res) => {
  RentalItem.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `${nums} RentalItems were deleted successfully` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error deleting RentalItems",
      });
    });
};
