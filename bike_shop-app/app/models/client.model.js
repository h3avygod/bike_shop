// Client
module.exports = (sequelize, Sequelize) => {
  const Client = sequelize.define("client", {
    last_name: {
      type: Sequelize.STRING(100),
    },
    first_name: {
      type: Sequelize.STRING(100),
    },
    middle_name: {
      type: Sequelize.STRING(100),
    },
    phone: {
      type: Sequelize.STRING(20),
    },
    email: {
      type: Sequelize.STRING(100),
    },
    registration_date: {
      type: Sequelize.DATEONLY,
    },
  });
  return Client;
};