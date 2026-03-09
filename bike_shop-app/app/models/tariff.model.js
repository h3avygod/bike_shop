// Tariff
module.exports = (sequelize, Sequelize) => {
  const Tariff = sequelize.define("tariff", {
    id_category: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(100),
    },
    price_per_hour: {
      type: Sequelize.DECIMAL(10, 2),
    },
    price_per_day: {
      type: Sequelize.DECIMAL(10, 2),
    },
    start_date: {
      type: Sequelize.DATEONLY,
    },
    end_date: {
      type: Sequelize.DATEONLY,
    },
  });
  return Tariff;
};