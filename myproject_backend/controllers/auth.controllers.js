"use strict";
const pool = require("../db/conn");
const format = require("pg-format");
const argon = require("argon2");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
	const client = await pool.connect();
	const { email, password } = req.query;
	try {
		if (!password || !email) {
			return res.status(401).send("Please provide email & password");
		}
		await client.query("BEGIN");
		const userQuery = format(
			`SELECT email, password FROM 
			public."user" where email = '%s'`,
			email
		);
		const userInfo = await client.query(userQuery);
		await client.query("COMMIT");

		// check userInfo
		if (!(userInfo && userInfo.rows && userInfo.rows.length > 0)) {
			return res.status(401).send("Invalid Credentials");
		}

		// check password using verify hash
		const checkPassword = await argon.verify(
			userInfo.rows[0].password,
			password
		);
		let response;
		if (checkPassword) {
			const token = await createToken(email);
			response = {
				msg: "Successfully Login",
				token,
			};
		} else {
			response = {
				msg: "Invalid Credentials",
			};
		}
		res.send(response);
	} catch (error) {
		await client.query("ROLLBACK");
		res.send(error);
	} finally {
		await client.release(); // no need to add here await (but it ok if placed)[according to doc]
	}
};

const register = async (req, res) => {
	const client = await pool.connect();
	const { userName, email, password } = req.body;
	try {
		// check all value present or not
		if (!userName || !password || !email) {
			return res.status(401).send("Please provide all credentials");
		}
		await client.query("BEGIN");

		// hash password using argon2
		const hashPassword = await argon.hash(password);

		const insertQuery = format(
			`INSERT INTO public."user"("userName", email, password) 
      VALUES ('%s', '%s', '%s')`,
			userName,
			email,
			hashPassword
		);
		await client.query(insertQuery);
		await client.query("COMMIT");
		const token = await createToken(email);
		const response = {
			data: { email, userName },
			msg: "Successfully Inserted",
			token,
		};
		res.json(response);
	} catch (error) {
		console.log(error);
		res.send(error);
	} finally {
		await client.release();
	}
};

const users = async (req, res) => {
	const client = await pool.connect();
	try {
		// check all value present or not
		await client.query("BEGIN");

		// hash password using argon2

		const insertQuery = format(
			"SELECT \"userName\", email, password FROM public.\"user\""
		);
		const users = await client.query(insertQuery);
		await client.query("COMMIT");
		const response = {
			data: users?.rows,
			count: users?.rowCount,
			msg: "Fetched Successfully",
		};
		res.json(response);
	} catch (error) {
		console.log(error);
		res.send(error);
	} finally {
		await client.release();
	}
};

const createToken = async (email) => {
	return await jwt.sign(
		{
			email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_LIFETIME }
	);
};

module.exports = {
	login,
	register,
	users,
};
