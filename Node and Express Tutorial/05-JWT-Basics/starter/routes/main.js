const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authiddleware = require("../middleware/auth");
router.route("/dashboard").get(authiddleware, dashboard);
router.route("/login").post(login);

module.exports = router;
