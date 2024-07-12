const Section = require("../models/section.model");

const { v4: uuidv4 } = require("uuid");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const section = await Section.create(request.body);
    response.status(201).json({
      status: "success",
      status_code: 201,
      error: null,
      data: {
        section: section,
      },
      message: "Section created successfully!",
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      status_code: 400,
      error: {
        error_message: error.message,
      },
      message: "Error occured while creating section",
      data: null,
    });
  }
};

const getAll = async (request, response) => {
  const id = request.params.project_id;
  try {
    const section = await Section.findAll({ where: { project_id: id } });
    response.status(200).json({
      status: "success",
      status_code: 200,
      error: null,
      message: "Sections are retrived successfully!",
      data: {
        section: section,
      },
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      error: {
        error: error.message,
      },
      message: "Error occured while fetching sections.",
      data: null,
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
        status_code: 200,
        message: "Section data is fetched successfully!",
        data: {
          section: section,
        },
        error: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      message: `Error occured while fetching section with id ${id}`,
      data: null,
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

      const section = Section.findOne({ where: { id: section_id } });

      response.status(200).json({
        status: "success",
        status_code: 200,
        data: {
          section: section,
        },
        message: `Section details are updated successfully!`,
        error: null,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      data: null,
      message: "Error occured while updating section details!",
    });
  }
};

const remove = async (request, response) => {
  const section_id = request.params.id;
  try {
    await Section.destroy({ where: { id: section_id } });
    response.status(204).json({
      status: "success",
      status_code: 204,
      message: "Section removed successfully!",
    });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      message: `Error occured while removeing section`,
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
