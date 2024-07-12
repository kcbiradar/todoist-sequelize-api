const { DataTypes } = require("sequelize");

const sequelize = require("../config/config.db");

const User = require("../models/user.model");

const Label = sequelize.define("Label", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
  },
  is_favorite: {
    type: DataTypes.BOOLEAN,
  },
  user_id: {
    type: DataTypes.STRING,
    references: { model: User, key: "id" },
    onDelete: "CASCADE",
  },
});

module.exports = Label;
