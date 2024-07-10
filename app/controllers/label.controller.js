const Label = require("../models/label.model");

const { v4: uuidv4 } = require('uuid');

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const label = await Label.create(request.body);
    response.status(201).json({
      status: "success",
      data: label,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      message: error.message || "Error occured while creating label",
    });
  }
};

const getAll = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      const label = await Label.findAll({
        where: { user_id: id },
      });
      response.status(200).json({
        status: "success",
        data: label,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || `Error occured while fetching label`,
    });
  }
};

const update = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      await Label.update(request.body, {
        where: { id: id },
      });
      response.status(200).json({
        status: "success",
        message: `Label details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || "Error occured while updating label details!",
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Label.destroy({ where: { id: id } });
    response
      .status(204)
      .json({ status: "success", message: "label removed successfully!" });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || `Error occured while removeing label`,
    });
  }
};

module.exports = {
  create,
  getAll,
  update,
  remove,
};
