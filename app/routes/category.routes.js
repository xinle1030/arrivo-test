const { authJwt } = require("../middleware");
const {
  createCategory,
  updateCategory,
  viewCategory,
  deleteCategory,
} = require("../controllers/category");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/categories", [authJwt.verifyToken, authJwt.isAdmin], createCategory.createCategory);

  app.get("/api/categories/all", viewCategory.getAllCategories);

  app.get("/api/categories/:id", viewCategory.getCategoryById);

  app.put(
    "/api/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    updateCategory.updateCategoryById
  );

  app.delete(
    "/api/categories/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteCategory.deleteAllCategories
  );

  app.delete(
    "/api/categories/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    deleteCategory.deleteCategoryById
  );
};
