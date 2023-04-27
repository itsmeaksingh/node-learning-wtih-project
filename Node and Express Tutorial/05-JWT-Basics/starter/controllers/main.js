// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard
const jwt = require("jsonwebtoken");
const { BadRequetError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  // mongoose valisation
  // Joi package
  // check in the controller
  if (!username || !password) {
    throw new BadRequetError("Pls provide email and password");
  }

  // just for demo, normally privded by DB !!!
  const id = new Date().getDate();

  // tey to keep payload small, better experience for user
  // just for demo, in production use long, complex and unguessable string value !!!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).send({
    msg: `hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lukcy number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
