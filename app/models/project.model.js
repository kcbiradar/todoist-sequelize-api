const { DataTypes } = require("sequelize");

const sequelize = require("../config/config.db");

const User = require("../models/user.model");

const Project = sequelize.define("Projects", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  is_shared: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  comment_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  url: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
    unique: true,
  },
  view_style: {
    type: DataTypes.STRING,
  },
  is_inbox_project: {
    type: DataTypes.BOOLEAN,
  },
  is_team_inbox: {
    type: DataTypes.BOOLEAN,
  },
  parent_id: {
    type: DataTypes.STRING,
    allowNull: true,
    references: { model: "Projects", key: "id" },
    onDelete: "CASCADE",
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE",
  },
});

module.exports = Project;
