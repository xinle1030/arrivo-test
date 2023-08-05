const db = require("../../models");
const Category = db.category;

exports.updateCategoryById = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { name, description, activated } = req.body;

    // Update category details based on req.body
    if (name) category.name = name;
    if (description) category.description = description;
    if (activated) category.activated = activated;

    // Save the updated category to the database
    await category.save();

    const updatedCategory = {
      ...category.get(),
    };

    res.status(200).json({ message: "Category Updated.", category: updatedCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category data" });
  }
};
