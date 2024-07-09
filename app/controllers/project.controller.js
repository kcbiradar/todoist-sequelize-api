const Project = require("../models/project.model");

const Comment = require("../models/comment.model");

const create = async (request, response) => {
  try {
    const url =
      request.protocol + "://" + request.get("host") + request.originalUrl;
    request.body.url = url;
    const project = await Project.create(request.body);
    project.url += `?id=${project.id}`;
    response.status(201).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      message: error.message || "Error occured while creating project",
    });
  }
};

const getAll = async (request, response) => {
  try {
    const project = await Project.findAll();
    response.status(200).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || "Error occured while fetching projects.",
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
        data: project,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message:
        error.message ||
        `Error occured while fetching project with id ${project_id}`,
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
        message: `Project details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || "Error occured while updating project details!",
    });
  }
};

const remove = async (request, response) => {
  const project_id = request.params.id;
  try {
    await Project.destroy({ where: { id: project_id } });
    response
      .status(204)
      .json({ status: "success", message: "Project removed successfully!" });
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || `Error occured while removeing project`,
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
        data: comment,
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || `Error occured while fetching comments`,
    });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
  remove,
  getComments
};
