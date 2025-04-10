const { DataTypes } = require("sequelize");
const sequelize = require("../../database");

const FunctionModel = sequelize.define("Function", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  route: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeout: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5, // ⬅️ sets 5 seconds by default
  },
  runtime: {
    type: DataTypes.STRING,
    defaultValue: "runc", // ⬅️ default is Docker; use "runsc" for gVisor
  },
});

sequelize.sync(); // Optional: Can be removed in production

module.exports = FunctionModel;

