const Product = require("../models/product");
const _ = require("lodash");
const aws = require("aws-sdk");
const fs = require("fs");

const s3 = new aws.S3({});

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, prod) => {
      if (err || !prod) {
        return res.status(400).json({
          error: "No product was found in DB",
        });
      }
      req.product = prod;
      next();
    });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.createProduct = (req, res) => {
  var params = {
    ACL: "public-read",
    Bucket: process.env.BUCKET_NAME,
    Body: fs.createReadStream(req.file.path),
    Key: `${req.file.originalname}`,
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error occured while trying to upload to S3 bucket", err);
    }

    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      let product = new Product(req.body);
      product.photo = data.Location;

      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Saving tshirt in DB failed",
          });
        }

        res.json(product);
      });
    }
  });
};

//delete route
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, delProduct) => {
    if (err) {
      return res.status(400).json({
        err: "failed to delete the product",
      });
    }
    res.json({
      msg: "deletion is successfull",
      delProduct,
    });
  });
};

//update route
exports.updateProduct = (req, res) => {
  var params = {
    ACL: "public-read",
    Bucket: process.env.BUCKET_NAME,
    Body: fs.createReadStream(req.file.path),
    Key: `${req.file.originalname}`,
  };

  //updation code
  let product = req.product;
  product = _.extend(product, req.body);

  s3.upload(params, (err, data) => {
    if (err) {
      console.log("Error occured while trying to upload to S3 bucket", err);
    }

    if (data) {
      fs.unlinkSync(req.file.path); // Empty temp folder
      product.photo = data.Location;

      product.save((err, product) => {
        if (err) {
          res.status(400).json({
            error: "Updation of Product Failed ",
          });
        }
        res.json(product);
      });
    }
  });
};

//listing route
exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Product.find()
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "NO product FOUND",
        });
      }
      res.json(products);
    });
};

// middleware
exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        err: "No category found",
      });
    }
    res.json(category);
  });
};

exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((prod) => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation Failed",
      });
    }
    next();
  });
};
