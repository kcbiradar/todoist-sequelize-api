const { DataTypes } = require("sequelize");

const sequelize = require("../config/config.db");

const User = require("../models/user.model");
const Project = require("./project.model");
const Section = require("../models/section.model");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  project_id: {
    type: DataTypes.STRING,
    references: { model: Project, key: "id" },
    onDelete: "CASCADE",
  },
  section_id: {
    type: DataTypes.STRING,
    references: { model: Section, key: "id" },
    onDelete: "CASCADE",
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  parent_id: {
    type: DataTypes.STRING,
    references: { model: "Tasks", key: "id" },
  },
  description: {
    type: DataTypes.STRING,
  },
  labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  priority: {
    type: DataTypes.INTEGER,
  },
  url: {
    type: DataTypes.STRING,
  },
  comment_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  duration: {
    type: DataTypes.DATE,
  },
  due: {
    type: DataTypes.JSONB,
  },
  creator_id: {
    type: DataTypes.STRING,
    references: { model: User, key: "id" },
    onDelete: "CASCADE",
  },
  assignee_id: {
    type: DataTypes.STRING,
    references: { model: User, key: "id" },
  },
  assigner_id: {
    type: DataTypes.STRING,
    references: { model: User, key: "id" },
  },
});

module.exports = Task;
