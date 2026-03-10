const { where } = require("sequelize");
const db = require("../models");
const Client = db.client;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (
    !req.body.last_name ||
    !req.body.first_name ||
    !req.body.phone ||
    !req.body.registration_date
  ) {
    res
      .status(400)
      .send({
        message:
          "Last name, first name, phone and registration date are required",
      });
    return;
  }

  const client = {
    last_name: req.body.last_name,
    first_name: req.body.first_name,
    middle_name: req.body.middle_name,
    phone: req.body.phone,
    email: req.body.email,
    registration_date: req.body.registration_date,
  };

  Client.create(client)
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || "Error creating Client" }),
    );
};

exports.findAll = (req, res) => {
  const phone = req.query.phone;
  const condition = phone ? { phone: { [Op.iLike]: `%${phone}%` } } : null;

  Client.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error retrieving Clients" }),
    );
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Client.findByPk(id)
    .then((data) => {
      if (data) res.send(data);
      else res.status(404).send({ message: `Client with id=${id} not found` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error retrieving Client with id=" + id }),
    );
};

exports.update = (req, res) => {
  const id = req.params.id;
  Client.update(req.body, { where: { id_client: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Client updated successfully" });
      else res.send({ message: `Cannot update Client with id=${id}` });
    })
    .catch((err) =>
      res.status(500).send({ message: "Error updating Client with id=" + id }),
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Client.destroy({ where: { id_client: id } })
    .then((num) => {
      if (num == 1) res.send({ message: "Client deleted successfully" });
      else res.send({ message: `Cannot delete Client with id=${id}` });
    })
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Could not delete Client with id=" + id }),
    );
};

exports.deleteAll = (req, res) => {
  Client.destroy({ where: {}, truncate: false })
    .then((nums) =>
      res.send({ message: `${nums} Clients deleted successfully` }),
    )
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || "Error deleting Clients" }),
    );
};

exports.getClientRentals = (req, res) => {
  const id = req.params.id;

  db.sequelize.query(
    'SELECT r.* FROM "Rental" r LEFT JOIN "Client" c ON r.id_client = c.id_client WHERE c.id_client = :id',
    {
      replacements: { id: id },
      type: QueryTypes.SELECT,
      model: db.rental,
      mapToModel: true
    }
  )
  .then(result => {
    res.send(result || []);
  })
  .catch(err => {
    res.status(500).send({ message: err.message || "Error getting client rentals" });
  });
};