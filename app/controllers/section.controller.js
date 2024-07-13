const Section = require("../models/section.model");

const { v4: uuidv4 } = require("uuid");

const sendResponse = require("../utils/response");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const section = await Section.create(request.body);
    sendResponse(response, 201, "Section created successfully!", section);
  } catch (error) {
    sendResponse(
      response,
      400,
      "Error occured while creating section",
      error.message
    );
  }
};

const getAll = async (request, response) => {
  const id = request.params.project_id;
  try {
    const section = await Section.findAll({ where: { project_id: id } });
    sendResponse(response, 200, "Sections are retrived successfully!", section);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching sections",
      error.message
    );
  }
};

const getOne = async (request, response) => {
  const id = request.params.id;
  try {
    if (id) {
      const section = await Section.findOne({
        where: { id: id },
      });
      sendResponse(response, 200, "Section fetched successfully!", section);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching section",
      error.message
    );
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
      sendResponse(
        response,
        200,
        "Section details are updated successfully!",
        section
      );
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while updating section details!",
      error.message
    );
  }
};

const remove = async (request, response) => {
  const section_id = request.params.id;
  try {
    await Section.destroy({ where: { id: section_id } });
    sendResponse(response, 204, "Section removed successfully!", null);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while removing section",
      error.message
    );
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
};
