const jwt = require("jsonwebtoken");
require("dotenv").config();

const authGuard = async (req, res, next) => {
	// check header
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		res.send("Authentication invalid");
	}
	const token = authHeader.split(" ")[1];

	try {
		const payload = await jwt.verify(token, process.env.JWT_SECRET);

		// attach the user to the job routes
		req.user = { email: payload.email };
		next();
	} catch (error) {
		console.log("error: ", error);
		res.send("Authentication invalid");
		// throw new UnauthenticatedError("Authentication invalid");
	}
};

module.exports = {
	authGuard,
};
