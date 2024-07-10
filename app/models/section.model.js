const { DataTypes } = require("sequelize");

const sequelize = require("../config/config.db");

const Project = require("../models/project.model");

const Section = sequelize.define("Section", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  project_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { model: Project, key: "id" },
  },
});

module.exports = Section;
