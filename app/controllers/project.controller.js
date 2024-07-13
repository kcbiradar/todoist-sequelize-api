const Project = require("../models/project.model");

const Comment = require("../models/comment.model");

const sendResponse = require("../utils/response");

const { v4: uuidv4 } = require("uuid");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    request.body.user_id = request.params.user_id;
    const project = await Project.create(request.body);
    const project_url = `http://localhost:3000/api/v1/project/showProject?id=${project.id}`;

    project.url = project_url;

    await Project.update(
      {
        url: project_url,
      },
      { where: { id: project.id } }
    );

    sendResponse(response, 201, "Project created successfully!", project);
  } catch (error) {
    sendResponse(
      response,
      400,
      "Error occured while creating project",
      error.message
    );
  }
};

const getAll = async (request, response) => {
  console.log(request.params.user_id);
  try {
    const project = await Project.findAll({
      where: { user_id: request.params.user_id },
    });
    sendResponse(response, 200, "Successfully retrived all projects", project);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching projects.",
      error.message
    );
  }
};

const getOne = async (request, response) => {
  const project_id = request.query.id;
  try {
    if (project_id) {
      const project = await Project.findOne({
        where: { id: project_id },
      });
      sendResponse(response, 200, "Project fetched successfully", project);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching project",
      error.message
    );
  }
};

const update = async (request, response) => {
  const project_id = request.params.id;
  try {
    if (project_id) {
      await Project.update(request.body, {
        where: { id: project_id },
      });
      const project = Project.findOne({ where: { id: project_id } });
      sendResponse(
        response,
        200,
        "Project details are updated successfully!",
        project
      );
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while updating project details",
      error.message
    );
  }
};

const remove = async (request, response) => {
  const project_id = request.params.id;
  try {
    await Project.destroy({ where: { id: project_id } });
    sendResponse(response, 204, "Project removed successfully!", null);
  } catch (error) {
    sendResponse(response, 500, "Error occured while removing project", null);
  }
};

const getComments = async (request, response) => {
  const project_id = request.params.id;
  try {
    if (project_id) {
      const comment = await Comment.findAll({
        where: { project_id: project_id },
      });

      sendResponse(response, 200, "Fetched all comments successfully", comment);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching comments",
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
  getComments,
};
