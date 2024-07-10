const Section = require("../models/section.model");

const { v4: uuidv4 } = require('uuid');

const create = async (request, response) => {
  const { order, name, project_id } = request.body;
  try {
    request.body.id = uuidv4();
    const section = await Section.create(request.body);
    response.status(201).json({
      status: "success",
      data: section,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      message: error.message || "Error occured while creating section",
    });
  }
};

const getAll = async (request, response) => {
  const id = request.params.project_id;
  try {
    const section = await Section.findAll({ where: { project_id: id } });
    response.status(200).json({
      status: "success",
      data: section,
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || "Error occured while fetching sections.",
    });
  }
};

const getOne = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      const section = await Section.findOne({
        where: { id: id },
      });
      response.status(200).json({
        status: "success",
        data: section,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message:
        error.message ||
        `Error occured while fetching section with id ${project_id}`,
    });
  }
};

const update = async (request, response) => {
  const section_id = request.params.id;
  try {
    if (section_id) {
      await Section.update(request.body, {
        where: { id: section_id },
      });
      response.status(200).json({
        status: "success",
        message: `Section details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || "Error occured while updating section details!",
    });
  }
};

const remove = async (request, response) => {
  const section_id = request.params.id;
  try {
    await Section.destroy({ where: { id: section_id } });
    response
      .status(204)
      .json({ status: "success", message: "Section removed successfully!" });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || `Error occured while removeing section`,
    });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
