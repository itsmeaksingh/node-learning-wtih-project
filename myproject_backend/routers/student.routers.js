"use strict";
const express = require("express");
const routers = express.Router();

const {
	createStudent,
	getOneStudent,
	getStudent,
	deleteStudent,
	updateStudent,
} = require("../controllers/student.controllers");

routers.post("/", createStudent);
routers.get("/:id", getOneStudent);
routers.delete("/:id", deleteStudent);
routers.patch("/:id", updateStudent);
routers.get("/", getStudent);


module.exports = routers;
