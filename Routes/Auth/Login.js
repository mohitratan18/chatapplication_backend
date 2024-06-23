const express = require("express");
const router = express.Router();
const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  let status = false;
  try {
    if (!email || !password) {
      return res.status(404).json({ message: "invalid credentails" });
    }
    const usercheck = await User.findOne({ email: email });
    // console.log(usercheck);
    if (!usercheck) {
      return res.status(401).json({ message: "User not found", status });
    }
    const ans = await bcrypt.compare(password, usercheck.password);
    if (!ans) {
      return res.status(401).json({ message: "Incorrect credentials", status });
    }
    const data = {
      user: {
        id: usercheck._id,
      },
    };
    const authtoken = jwt.sign({
      _id: usercheck._id,
      email: usercheck.email,
      name: usercheck.name,
      phoneno: usercheck.phoneno,
    },process.env.SECRET);
    status = true;
    return res
      .status(200)
      .json({ message: "Login success", status, authtoken });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
