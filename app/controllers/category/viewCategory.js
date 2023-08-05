const db = require("../../models");
const Category = db.category;

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();

    // Remove any null values (optional, if you want to remove errored categories)
    const filteredCategories = categories.filter(
      (category) => category !== null
    );

    res.status(200).json({ message: "Categories Retrieved.", categories: filteredCategories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving categories data" });
  }
};

// Get the category for a given category id
exports.findCategoryById = async (id) => {
  console.log(id)
  return Category.findByPk(id)
    .then((category) => {
      const categoryData = category.get();
      return categoryData;
    })
    .catch((err) => {
      console.log(">> Error while finding category: ", err);
    });
};

exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await exports.findCategoryById(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category Retrieved.", category: category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving category data" });
  }
};