module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts", {
    title: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
  });

  return Post;
};
