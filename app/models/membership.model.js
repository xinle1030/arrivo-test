module.exports = (sequelize, Sequelize) => {
  const Membership = sequelize.define("memberships", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Membership;
};
