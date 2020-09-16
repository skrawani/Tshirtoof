const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { signOut, signUp, signIn, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 characters long").isLength({
      min: 3
    }),
    check("email", "Invalid Email ").isEmail(),
    check("password", "Password shuold be atleast 4 characters long").isLength({
      min: 4
    })
  ],
  signUp
);

router.post(
  "/signin",
  [
    check("email", "Invalid Email ").isEmail(),
    check("password", "Pass shuold be atleast 4 characters long").isLength({
      min: 4
    })
  ],
  signIn
);

router.get("/signout", signOut);

router.get("/test", isSignedIn, (req, res) => {
  res.send("Protected api call");
});

module.exports = router;
