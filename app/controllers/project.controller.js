const Project = require("../models/project.model");

const Comment = require("../models/comment.model");

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

    response.status(201).json({
      status: "success",
      status_code: 201,
      message: "Project created successfully!",
      data: {
        project: project,
      },
      error: null,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      status_code: 400,
      message: error.message || "Error occured while creating project",
      data: null,
      error: {
        code: "Unable to create project",
      },
    });
  }
};

const getAll = async (request, response) => {
  console.log(request.params.user_id);
  try {
    const project = await Project.findAll({
      where: { user_id: request.params.user_id },
    });
    response.status(200).json({
      status: "success",
      status_code: 200,
      message: "Successfully retrived all projects",
      data: {
        projects: project,
      },
      error: null,
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      message: error.message || "Error occured while fetching projects.",
      data: null,
      error: {
        code: "Unable to fetch projects",
      },
    });
  }
};

const getOne = async (request, response) => {
  const project_id = request.query.id;
  try {
    if (project_id) {
      const project = await Project.findOne({
        where: { id: project_id },
      });
      response.status(200).json({
        status: "success",
        code: 200,
        message: "Project fetched successfully",
        data: {
          project: project,
        },
        error: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      data: null,
      message: `Error occured while fetching project with id ${project_id}`,
      error: error.message,
    });
  }
};

const update = async (request, response) => {
  const project_id = request.params.id;
  try {
    if (project_id) {
      await Project.update(request.body, {
        where: { id: project_id },
      });
      response.status(200).json({
        status: "success",
        status_code: 200,
        message: `Project details are updated successfully!`,
        error: null,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      status_code: 500,
      message: "Error occured while updating project details!",
      error: error.message,
    });
  }
};

const remove = async (request, response) => {
  const project_id = request.params.id;
  try {
    await Project.destroy({ where: { id: project_id } });
    response.status(204).json({
      status: "success",
      status_code: 204,
      message: "Project removed successfully!",
      error: null,
    });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      status_code: 500,
      message: `Error occured while removeing project`,
      error: error.message,
    });
  }
};

const getComments = async (request, response) => {
  const project_id = request.params.id;
  try {
    if (project_id) {
      const comment = await Comment.findAll({
        where: { project_id: project_id },
      });
      response.status(200).json({
        status: "success",
        status_code: 200,
        message: "Fetched all comments successfully",
        data: {
          comment: comment,
        },
        error: null,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      message: `Error occured while fetching comments`,
      error: error.message,
      data: null,
    });
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
