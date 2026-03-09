// Rental
module.exports = (sequelize, Sequelize) => {
  const Rental = sequelize.define("rental", {
    id_client: {
      type: Sequelize.INTEGER,
    },
    id_tariff: {
      type: Sequelize.INTEGER,
    },
    start_datetime: {
      type: Sequelize.DATE,
    },
    planned_end_datetime: {
      type: Sequelize.DATE,
    },
    actual_end_datetime: {
      type: Sequelize.DATE,
    },
    total_amount: {
      type: Sequelize.DECIMAL(10, 2),
    },
    status: {
      type: Sequelize.STRING(20),
    },
  });
  return Rental;
};