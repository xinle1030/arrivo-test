const db = require("../../models");
const Category = db.category;

exports.createCategory = async (req, res) => {
  let { name, description, activated } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (! activated) activated = false;

  try {
    const category = await Category.create({
      name,
      description,
      activated,
    });

    res.status(201).json(category); // Send the response as JSON
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // Handle validation errors (e.g., missing fields, invalid data types)
      return res.status(400).json({ message: error.message });
    } else {
      console.error(error);
      return res.status(500).json({ message: "Error creating new category" });
    }
  }
};
