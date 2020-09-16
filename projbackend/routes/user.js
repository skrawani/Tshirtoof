const express = require("express");
const router = express.Router();

const {
  getUser,
  getUserById,
  updateUser,
  userPurchaseList
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
//params
router.param("userId", getUserById);
//actual routes

//read user
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

//update
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

//get user purchase list
router.get(
  "/orders/user/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
