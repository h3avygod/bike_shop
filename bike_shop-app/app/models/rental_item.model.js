module.exports = (sequelize, Sequelize) => {
  const Rental_Item = sequelize.define("rental_item", {
    id_rental: {
      type: Sequelize.INTEGER,
    },
    id_bicycle: {
      type: Sequelize.INTEGER,
    },
    hours_used: {
      type: Sequelize.INTEGER,
    },
    item_cost: {
      type: Sequelize.DECIMAL(10, 2),
    },
  });
  return Rental_Item;
};