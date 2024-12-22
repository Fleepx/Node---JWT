const express = require("express");
const {
  createUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
const { verifyCredentials, validateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/usuarios", verifyCredentials, createUser);

router.post("/login", verifyCredentials, loginUser);

router.get("/usuarios", validateToken, getUser);

module.exports = router;
