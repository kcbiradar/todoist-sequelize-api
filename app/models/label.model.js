const { DataTypes } = require("sequelize");

const sequelize = require("../config/config.db");

const Label = sequelize.define("Label", {
  id: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  is_favorite: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = Label;
