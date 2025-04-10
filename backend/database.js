const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("function_db", "root", "Shree@17", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

module.exports = sequelize;
