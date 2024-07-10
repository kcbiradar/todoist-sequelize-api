const { DataTypes } = require("sequelize");
const sequelize = require("../config/config.db");
const Project = require("../models/project.model");
const Task = require("../models/task.model");

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  project_id: {
    type: DataTypes.STRING,
    references: { model: Project, key: "id" },
  },
  task_id: {
    type: DataTypes.STRING,
    references: { model: Task, key: "id" },
  },
  attachment: {
    type: DataTypes.JSONB,
  },
});

Comment.afterCreate(async (comment, options) => {
  try {
    if (comment.project_id) {
      await Project.increment("comment_count", {
        by: 1,
        where: { id: comment.project_id },
      });
    }

    if (comment.task_id) {
      await Task.increment("comment_count", {
        by: 1,
        where: { id: comment.task_id },
      });
    }
  } catch (error) {
    console.error("Error occurred while updating comment_count:", error);
  }
});

module.exports = Comment;
