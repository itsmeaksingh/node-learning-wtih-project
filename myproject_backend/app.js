"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const auth = require("./routers/auth.routers");
const student = require("./routers/student.routers");

const { authGuard } = require("./middleware/auth.middleware");

const port = process.env.PORT || 3000;

// for cors policy
app.use(
	cors({
		origin: "*",
	})
);

// parse form data
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

// authentication middleware
app.use("/api/auth", auth);
app.use("/api/student", authGuard, student);


app.get("/", (req, res) => {
	res.send("<h1>Hi, Amit you are the best.</h1>");
});

app.get("**", (req, res) => {
	res.send("<h1>404 Page </h1>");
});

// always listen
app.listen(port, () => {
	console.log("server listening", port);
});
