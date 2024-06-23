const express = require("express");
const User = require("../../Models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { name, email, password, phoneno } = req.body;
  let status = false;
  if (name && email && password && phoneno) {
    try {
      if (
        (await User.findOne({ email })) ||
        (await User.findOne({ phoneno }))
      ) {
        return res.status(404).json({ message: "User exsists" });
      }

      const salt = await bcrypt.genSalt(10);
      const pass = await bcrypt.hash(password, salt);
      const usercheck = await User.create({
        name,
        email,
        phoneno,
        password: pass,
      });
      const data = {
        user: {
          id: usercheck._id,
        },
      };
      const authtoken = jwt.sign(
        {
          _id: usercheck._id,
          email: usercheck.email,
          phoneno: usercheck.phoneno,
        },
        process.env.SECRET
      );
      status = true;
      return res
        .status(200)
        .json({ message: "Login success", status, authtoken });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(404).json({ message: "Please enter required details" });
  }
});

module.exports = router;
