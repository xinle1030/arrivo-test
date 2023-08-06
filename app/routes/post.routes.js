const { authJwt } = require("../middleware");
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

  app.post("/api/posts", [authJwt.verifyToken, authJwt.isAdmin], createPost.createPost);

  app.get(
    "/api/posts",
    [authJwt.verifyToken, authJwt.checkAccess],
    viewPost.getAllPostsByPostLabelId
  );

  app.get(
    "/api/posts/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    viewPost.getAllPosts
  );

  app.get(
    "/api/posts/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    viewPost.getPostById
  );

  app.put(
    "/api/posts/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updatePost.updatePostById
  );

  app.delete(
    "/api/posts/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    deletePost.deleteAllPosts
  );

  app.delete(
    "/api/posts/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deletePost.deletePostById
  );
};
