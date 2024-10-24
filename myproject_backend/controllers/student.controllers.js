"use strict";
const pool = require("../db/conn");
const format = require("pg-format");
const v4 = require("uuid4");
const argon = require("argon2");

const createStudent = async (req, res) => {
	const client = await pool.connect();
	try {
		const { name, email, phone, address, password } = req.body;
		if (!name || !email || !password) {
			return res
				.status(401)
				.send("Please provide name, email & password");
		}
		await client.query("BEGIN");
		const id = v4();

		// hash password using argon2
		const hashPassword = await argon.hash(password);

		const studentQuery = format(
			`INSERT INTO public.student(id, name, email, phone, address, password)
			VALUES ('%s', '%s', '%s', '%s', '%s', '%s')`,
			id,
			name,
			email,
			phone,
			address,
			hashPassword
		);
		const studentInfo = await client.query(studentQuery);
		if (!(typeof studentInfo === "object")) {
			return res.status(401).send("Invalid Details");
		}
		let response = {
			data: {
				id,
				name,
				email,
				phone,
				address,
			},
			msg: "Successfully Inserted",
		};
		await client.query("COMMIT");
		res.send(response);
	} catch (error) {
		res.send(error);
	} finally {
		client.release();
	}
};

const updateStudent = async (req, res) => {
	console.log("patch updateStudent");
	const client = await pool.connect();
	try {
		const { name, email, phone, address, password } = req.body;
		const { id } = req.params;

		if (!id || !name) {
			return res.status(401).send("Please provide ID");
		}
		await client.query("BEGIN");

		let studentQuery = format("UPDATE public.student SET");

		if (name) {
			studentQuery += format(" name='%s'", name);
		}
		if (email) {
			studentQuery += format(", email='%s'", email);
		}
		if (phone) {
			studentQuery += format(", phone='%s'", phone);
		}
		if (address) {
			studentQuery += format(", address='%s'", address);
		}
		if (password) {
			// hash password using argon2
			const hashPassword = await argon.hash(password);
			studentQuery += format(", password='%s'", hashPassword);
		}
		studentQuery += format(" where id= '%s'", id);

		console.log("query: ", studentQuery);

		const studentInfo = await client.query(studentQuery);

		if (!(typeof studentInfo === "object")) {
			return res.status(401).send("Invalid Details");
		}
		let response = {
			data: {
				id,
				name,
				email,
				phone,
				address,
			},
			msg: "Successfully Updated",
		};
		await client.query("COMMIT");
		res.send(response);
	} catch (error) {
		res.send(error);
	} finally {
		client.release();
	}
};

const deleteStudent = async (req, res) => {
	const client = await pool.connect();
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(401).send("Please provide ID");
		}
		await client.query("BEGIN");
		const studentQuery = format(
			"DELETE FROM public.student WHERE id='%s'",
			id
		);
		const studentInfo = await client.query(studentQuery);
		if (!(typeof studentInfo === "object")) {
			return res.status(401).send("Invalid Details");
		}
		let response = {
			data: {
				id,
			},
			msg: "Successfully Deleted",
		};
		await client.query("COMMIT");
		res.send(response);
	} catch (error) {
		res.send(error);
	} finally {
		await client.release();
	}
};

const getStudent = async (req, res) => {
	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		const studentQuery = format(
			"SELECT id, name, email, phone, address FROM public.student;"
		);
		const studentInfo = await client.query(studentQuery);
		if (studentInfo.length === 0) {
			return res.status(401).send("Invalid Details");
		}
		let response = {
			data: studentInfo?.rows,
			rowCount: studentInfo?.rowCount,
			msg: "Fetched Successfully",
		};
		await client.query("COMMIT");
		res.send(response);
	} catch (error) {
		res.send(error);
	} finally {
		client.release();
	}
};

const getOneStudent = async (req, res) => {
	const client = await pool.connect();
	try {
		const { id } = req.params;
		if (!id) {
			return res.status(401).send("Please provide ID");
		}
		await client.query("BEGIN");
		const studentQuery = format(
			"SELECT id, name, email, phone, address FROM public.student where id='%s'",
			id
		);
		const studentInfo = await client.query(studentQuery);
		if (studentInfo.length === 0) {
			return res.status(401).send("Invalid Details");
		}
		let response = {
			data: studentInfo?.rows,
			rowCount: studentInfo?.rowCount,
			msg: "Fetched Successfully",
		};
		await client.query("COMMIT");
		res.send(response);
	} catch (error) {
		res.send(error);
	} finally {
		client.release();
	}
};

module.exports = {
	createStudent,
	updateStudent,
	deleteStudent,
	getStudent,
	getOneStudent,
};
