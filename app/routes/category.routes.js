const {
  createCategory,
  updateCategory,
  viewCategory,
  deleteCategory,
  viewCategoryById
} = require("../controllers/category");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/categories",
    createCategory.createCategory
  );

  app.get("/api/categories/all", viewCategory.getAllCategories);

  app.get("/api/categories/:id", viewCategory.getCategoryById);

  app.put("/api/categories/:id", updateCategory.updateCategoryById);

  app.delete("/api/categories/all", deleteCategory.deleteAllCategories);

  app.delete("/api/categories/:id", deleteCategory.deleteCategoryById);
};