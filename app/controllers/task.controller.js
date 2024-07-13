const { Op } = require("sequelize");
const Task = require("../models/task.model");

const { v4: uuidv4 } = require("uuid");

const Comment = require("../models/comment.model");

const sendResponse = require("../utils/response");

const create = async (request, response) => {
  try {
    request.body.id = uuidv4();
    const task = await Task.create(request.body);
    sendResponse(response, 201, "Task created successfully!", task);
  } catch (error) {
    sendResponse(
      response,
      400,
      "Error occured while creating task!",
      error.message
    );
  }
};

const getAll = async (request, response) => {
  try {
    const tasks = await Task.findAll();
    sendResponse(response, 200, "Tasks retrived successfully", tasks);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while retriving tasks",
      error.message
    );
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

    sendResponse(response, 200, "Matching tasks retrived successfully", tasks);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while retriving tasks",
      error.message
    );
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
    sendResponse(response, 200, "Matching tasks fetched successfully!", tasks);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while fetching tasks",
      error.message
    );
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
      sendResponse(
        response,
        200,
        "Task details are updated successfully",
        task
      );
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while updating task details",
      error.message
    );
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Task.destroy({ where: { id: id } });
    sendResponse(response, 204, "Task removed successfully!", null);
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while removing task",
      error.message
    );
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
      sendResponse(response, 200, "Tasks details updated successfully!", task);
    }
  } catch (error) {
    sendResponse(
      response,
      500,
      "Error occured while updating task details!",
      error.message
    );
  }
};

const getComments = async (request, response) => {
  const task_id = request.params.id;
  try {
    if (task_id) {
      const comment = await Comment.findAll({
        where: { task_id: task_id },
      });
      sendResponse(
        response,
        200,
        "All comments are fetched successfully",
        comment
      );
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
  filterByIds,
  getAll,
  filterByLabels,
  toggle,
  update,
  remove,
  getComments,
};
