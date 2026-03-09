
module.exports = (sequelize, Sequelize) => {
  const Bicycle = sequelize.define("bicycle", {
    model: {
      type: Sequelize.STRING(100),
    },
    manufacturer: {
      type: Sequelize.STRING(100),
    },
    frame_number: {
      type: Sequelize.STRING(50),
    },
    id_category: {
      type: Sequelize.INTEGER,
    },
    frame_size: {
      type: Sequelize.STRING(20),
    },
    brake_type: {
      type: Sequelize.STRING(50),
    },
    gear_count: {
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING(20),
    },
  });
  return Bicycle;
};