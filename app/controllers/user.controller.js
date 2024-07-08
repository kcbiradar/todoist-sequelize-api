const User = require("../models/user.model");

const create = async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response
      .status(400)
      .json({ message: error.message || "Error occured while creating user" });
  }
};

module.exports = {
  create,
};
