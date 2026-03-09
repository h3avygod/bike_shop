module.exports = (db) => {
  // Category → Bicycle
  db.bicycle.belongsTo(db.category, { foreignKey: "id_category" });
  
  // Category → Tariff
  db.tariff.belongsTo(db.category, { foreignKey: "id_category" });
  
  // Client → Rental
  db.rental.belongsTo(db.client, { foreignKey: "id_client" });
  
  // Tariff → Rental
  db.rental.belongsTo(db.tariff, { foreignKey: "id_tariff" });
  
  // Rental ↔ Bicycle (M:N через RentalItem)
  db.rentalItem.belongsTo(db.rental, { foreignKey: "id_rental" });
  db.rentalItem.belongsTo(db.bicycle, { foreignKey: "id_bicycle" });
  
  // Обратные связи (если нужны, как в примере с PurchaseGoods)
  db.rental.belongsToMany(db.bicycle, { through: db.rentalItem });
  db.bicycle.belongsToMany(db.rental, { through: db.rentalItem });
};