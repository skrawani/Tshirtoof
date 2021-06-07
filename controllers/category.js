const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Category npt found is DB",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Not able to save category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        err: "No category found",
      });
    }
    res.json(categories);
  });
  //
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.category;
  category.save((err, updateCategory) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to update category",
      });
    }
    res.json(updateCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        err: "Failed to delete this category",
      });
    }
    res.json({
      message: `Successfully deleted ${req.category.name}`,
    });
  });
};
