module.exports = (sequelize, Sequelize) => {
  const Post_Label = sequelize.define("post_labels", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Post_Label;
};
