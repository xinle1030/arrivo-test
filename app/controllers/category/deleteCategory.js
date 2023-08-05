const db = require("../../models");
const Category = db.category;

exports.deleteAllCategories = async (req, res) => {
  try {
    await Category.destroy({
      where: {}, // Empty object to delete all categorys (no condition)
    });

    res.status(200).json({ message: "All categories deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting categories." });
  }
};

exports.deleteCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.destroy(); // Delete the category from the database

    res.status(200).json({ message: "Category Deleted.", category: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};


