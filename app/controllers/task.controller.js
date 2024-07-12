const { Op } = require("sequelize");
const Task = require("../models/task.model");

const { v4: uuidv4 } = require("uuid");

const Comment = require("../models/comment.model");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const task = await Task.create(request.body);
    response.status(201).json({
      status: "success",
      status_code: 201,
      message: "Task created successfully!",
      data: {
        task: task,
      },
      error: null,
    });
  } catch (error) {
    response.status(400).json({
      status: "failed",
      status_code: 400,
      error: {
        error_message: error.message,
      },
      message: "Error occured while creating project",
      data: null,
    });
  }
};

const getAll = async (request, response) => {
  try {
    const tasks = await Task.findAll();
    response.status(200).json({
      status: "success",
      status_code: 200,
      data: {
        tasks: tasks || "No tasks available",
      },
      message: "Tasks retrived successfully",
      error: null,
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      data: null,
      error: {
        error_message: error.message,
      },
      message: "Error occured while retriving tasks",
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
      status_code: 200,
      data: {
        tasks: tasks || "No tasks available",
      },
      error: null,
      message: "Matching tasks retrived successfully!",
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      data: null,
      message: "Error occured while retriving tasks",
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

    response.status(200).json({
      status: "success",
      status_code: 200,
      message: "Matching tasks fetched successfully!",
      data: {
        tasks: tasks,
      },
      error: null,
    });
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      error: {
        error: error.message,
      },
      message: "Internal server error",
      data: null,
    });
  }
};

const update = async (request, response) => {
  const task_id = request.params.id;
  try {
    if (task_id) {
      await Task.update(request.body, {
        where: { id: task_id },
      });
      const task = await Task.findOne({ where: { id: task_id } });
      response.status(200).json({
        status: "success",
        status_code: 200,
        data: {
          task: task,
        },
        message: `Task details are updated successfully!`,
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
      message: "Error occured while updating task details!",
      data: null,
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Task.destroy({ where: { id: id } });
    response.status(204).json({
      status: "success",
      status_code: 204,
      data: null,
      error: null,
      message: "Task removed successfully!",
    });
  } catch (error) {
    response.status(500).send({
      status: "faied",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      message: `Error occured while removeing task`,
      data: null,
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
      const task = await Task.findOne({ where: { id: task_id } });
      response.status(200).json({
        status: "success",
        status_code: 200,
        data: {
          task: task,
        },
        message: `Task details are updated successfully!`,
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
      message: "Error occured while updating task details!",
      data: null,
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
        status_code: 200,
        error: null,
        data: {
          comment: comment,
        },
        message: "All comments are fetched successfully!",
      });
    }
  } catch (error) {
    response.status(500).json({
      status: "failed",
      status_code: 500,
      error: {
        error_message: error.message,
      },
      message: `Error occured while fetching comments`,
      data: null,
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
