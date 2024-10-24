"use strict";
const express = require("express");
const routers = express.Router();

const { login, register, users } = require("../controllers/auth.controllers");

routers.get("/login", login);
routers.post("/register", register);
routers.get("/users", users);

module.exports = routers;
