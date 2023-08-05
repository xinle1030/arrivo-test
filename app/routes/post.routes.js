const {
  createPost,
  updatePost,
  viewPost,
  deletePost,
} = require("../controllers/post");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/posts",
    createPost.createPost
  );

  app.get("/api/posts/all", viewPost.getAllPosts);

  app.get("/api/posts/:id", viewPost.getPostById);

  app.put("/api/posts/:id", updatePost.updatePostById);

  app.delete("/api/posts/all", deletePost.deleteAllPosts);

  app.delete("/api/posts/:id", deletePost.deletePostById);
};
