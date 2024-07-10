const User = require("../models/user.model");

const bcrypt = require("bcrypt");

const { v4: uuidv4 } = require("uuid");

const validator = require("validator");

const signup = async (request, response) => {
  try {
    const { password, ...userData } = request.body;
    userData.id = uuidv4();
    if (
      !validator.isEmail(userData.email) &&
      !validator.isStrongPassword(password)
    ) {
      return response.status(400).json({
        status: "failed",
        message: "Please provide valid inputs",
      });
    }

    const duplicateUser = await User.findOne({
      where: { email: userData.email },
    });

    if (duplicateUser) {
      return response.status(209).json({
        status: "failed",
        message: "alredy registered",
      });
    }

    const hashValue = await bcrypt.hash(password, 10);

    await User.create({
      ...userData,
      password: hashValue,
    });
    response.status(201).json({
      status: "success",
      message: "Registered successfully!",
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: "Unable to create user",
      error: error.message,
    });
  }
};

const login = async (request, response) => {
  try {
    const { password, email } = request.body;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        response.status(200).json({
          status: "success",
          message: "logged in successfully",
        });
      }
    } else {
      response.status(401).json({
        status: "failed",
        message: "Provide valid credentials",
      });
    }
  } catch (error) {
    response.status(401).json({
      status: "failed",
      message: "Auth failed",
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await User.destroy({ where: { id: id } });
    response
      .status(204)
      .json({ status: "success", message: "Account deleted successfully!" });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || `Error occured while deleting account`,
    });
  }
};

module.exports = {
  signup,
  login,
  remove,
};
