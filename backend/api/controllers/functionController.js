const FunctionModel = require("../models/Function");
const executeFunction = require("../utils/executeFunction");

const createFunction = async (req, res) => {
  try {
    const { name, language, route, runtime } = req.body;

    if (!name || !language || !route) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFunction = await FunctionModel.create({ name, language, route, runtime });
    res.status(201).json(newFunction);
  } catch (error) {
    console.error("Error creating function:", error);
    res.status(500).json({ error: error.toString() });
  }
};

const getFunctions = async (req, res) => {
  try {
    const functions = await FunctionModel.findAll();
    res.json(functions);
  } catch (error) {
    console.error("Error fetching functions:", error);
    res.status(500).json({ error: error.toString() });
  }
};

const deleteFunction = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await FunctionModel.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ error: "Function not found" });
    res.json({ message: "Function deleted" });
  } catch (error) {
    console.error("Error deleting function:", error);
    res.status(500).json({ error: error.toString() });
  }
};

const executeFunctionById = async (req, res) => {
  try {
    const id = req.params.id;
    const func = await FunctionModel.findByPk(id);

    if (!func) return res.status(404).json({ error: "Function not found" });

    const {
      input = "",
      code = null,
      runtime = func.runtime || "runc",
    } = req.body;

    const execConfig = {
      language: func.language,
      code: code || null,
      route: code ? "" : func.route,
      input,
      runtime,
    };

    const output = await executeFunction(execConfig);
    res.status(200).json({ output });
  } catch (error) {
    console.error("Error executing function:", error);
    res.status(500).json({ error: error.toString() });
  }
};

module.exports = {
  createFunction,
  getFunctions,
  deleteFunction,
  executeFunctionById,
};
