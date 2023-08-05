module.exports = (sequelize, Sequelize) => {
  const Post_Status = sequelize.define("post_statuses", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Post_Status;
};
