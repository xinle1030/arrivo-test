module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    id: {
      type: Sequelize.STRING, // Use STRING data type for the primary key
      primaryKey: true, // Set this field as the primary key
    },
    amount: {
      type: Sequelize.DOUBLE(10, 2),
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    completedAt: {
      type: Sequelize.STRING,
    },
  });

  return Payment;
};
