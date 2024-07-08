const { Op } = require("sequelize");
const Task = require("../models/task.model");

const create = async (request, response) => {
  try {
    const task = await Task.create(request.body);
    response.status(201).json(task);
  } catch (error) {
    response.status(400).json({
      message: error.message || "Error occured while creating project",
    });
  }
};

const filterByProjectId = async (request, response) => {
  try {
    const project_id = request.params.id;
    const tasks = await Task.findAll({
      where: { project_id: project_id },
    });
    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error occured while retriving tasks",
    });
  }
};

const filterBySectionId = async (request, response) => {
  try {
    const section_id = request.params.id;
    const tasks = await Task.findAll({
      where: { section_id: section_id },
    });
    response.status(200).json(tasks);
  } catch (error) {
    response.status(500).json({
      message: error.message || "Error occured while retriving tasks",
    });
  }
};

const filterByLabels = async (req, res) => {
  try {
    const { labels } = req.query;
    const labelsArray = labels.split(",");
    const tasks = await Task.findAll({
      where: {
        labels: {
          [Op.contains]: labelsArray,
        },
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error("Error filtering tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const update = async (request, response) => {
  const task_id = request.params.id;
  try {
    if (task_id) {
      await Task.update(request.body, {
        where: { id: task_id },
      });
      response
        .status(200)
        .json({ message: `Task details are updated successfully!` });
    }
  } catch (error) {
    response.status(500).send({
      message: error.message || "Error occured while updating task details!",
    });
  }
};

const remove = async (request, response) => {
  const id = request.params.id;
  try {
    await Task.destroy({ where: { id: id } });
    response.status(204).json({ message: "Task removed successfully!" });
  } catch (error) {
    response.status(500).send({
      message: error.message || `Error occured while removeing task`,
    });
  }
};

module.exports = {
  create,
  filterByProjectId,
  filterBySectionId,
  filterByLabels,
  //   getAll,
  //   getOne,
  update,
  remove,
};
