const { Op } = require("sequelize");
const Task = require("../models/task.model");

const Comment = require("../models/comment.model");

const create = async (request, response) => {
  try {
    const url =
      request.protocol + "://" + request.get("host") + request.originalUrl;
    request.body.url = url;
    const task = await Task.create(request.body);
    task.url += `?id=${task.id}`;
    response.status(201).json({
      status: "success",
      data: task,
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
    const tasks = await Task.findAll();
    response.status(200).json({
      status: "success",
      data: tasks || "No tasks available",
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || "Error occured while retriving tasks",
    });
  }
};

const filterByIds = async (request, response) => {
  try {
    const { project_id, section_id } = request.query;
    let tasks;
    if (project_id && section_id) {
      tasks = await Task.findAll({
        where: { project_id: project_id, section_id: section_id },
      });
    } else if (project_id) {
      tasks = await Task.findAll({ where: { project_id: project_id } });
    } else if (section_id) {
      tasks = await Task.findAll({ where: { section_id: section_id } });
    }
    response.status(200).json({
      status: "success",
      data: tasks || "No tasks available",
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      message: error.message || "Error occured while retriving tasks",
    });
  }
};

const filterByLabels = async (request, response) => {
  try {
    const { labels } = request.query;
    const labelsArray = labels.split(",");
    const tasks = await Task.findAll({
      where: {
        labels: {
          [Op.contains]: labelsArray,
        },
      },
    });

    response.json({
      status: "success",
      data: tasks,
    });
  } catch (error) {
    response
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};

const update = async (request, response) => {
  const task_id = request.params.id;
  try {
    if (task_id) {
      await Task.update(request.body, {
        where: { id: task_id },
      });
      response.status(200).json({
        status: "success",
        message: `Task details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || "Error occured while updating task details!",
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Task.destroy({ where: { id: id } });
    response
      .status(204)
      .json({ status: "success", message: "Task removed successfully!" });
  } catch (error) {
    response.status(500).send({
      status: "faied",
      message: error.message || `Error occured while removeing task`,
    });
  }
};

const toggle = async (request, response) => {
  const task_id = request.params.id;
  try {
    if (task_id) {
      await Task.update(request.body, {
        where: { id: task_id, is_completed: !is_completed },
      });
      response.status(200).json({
        status: "success",
        message: `Task details are updated successfully!`,
      });
    }
  } catch (error) {
    response.status(500).send({
      status: "failed",
      message: error.message || "Error occured while updating task details!",
    });
  }
};

const getComments = async (request, response) => {
  const task_id = request.params.id;
  try {
    if (task_id) {
      const comment = await Comment.findAll({
        where: { task_id: task_id },
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
  filterByIds,
  getAll,
  filterByLabels,
  toggle,
  update,
  remove,
  getComments,
};
