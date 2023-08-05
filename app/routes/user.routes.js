const {
  createUser,
  updateUser,
  viewUser,
  deleteUser,
} = require("../controllers/user");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/users",
    createUser.createUser
  );

  app.get("/api/users/all", viewUser.getAllUsers);

  app.get("/api/users/:id", viewUser.getUserById);

  app.put("/api/users/:id", updateUser.updateUserById);

  app.delete("/api/users/all", deleteUser.deleteAllUsers);

  app.delete("/api/users/:id", deleteUser.deleteUserById);
};
