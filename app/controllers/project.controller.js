const Project = require("../models/project.model");

const create = async (request, response) => {
  try {
    console.log(request.body)
    const project = await Project.create(request.body);
    console.log(project)
    response.status(201).json(project);
  } catch (error) {
    response.status(400).json({
      message: error.message || "Error occured while creating project",
    });
  }
};

const getAll = async (request, response) => {
  try {
    const project = await Project.findAll();
    response.status(200).json(project);
  } catch (error) {
    response.status(500).json({
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
      response.status(200).json(project);
    }
  } catch (error) {
    response.status(500).json({
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
      response
        .status(200)
        .json({ message: `Project details are updated successfully!` });
    }
  } catch (error) {
    response.status(500).send({
      message: error.message || "Error occured while updating project details!",
    });
  }
};

const remove = async (request, response) => {
  const project_id = request.params.id;
  try {
    await Project.destroy({ where: { id: project_id } });
    response.status(204).json({ message: "Project removed successfully!" });
  } catch (error) {
    response.status(500).send({
      message: error.message || `Error occured while removeing project`,
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
