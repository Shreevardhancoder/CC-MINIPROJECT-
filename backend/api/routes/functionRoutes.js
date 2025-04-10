const express = require("express");
const {
  createFunction,
  getFunctions,
  deleteFunction,
  executeFunctionById, // 👈 NEW controller method
} = require("../controllers/functionController");

const router = express.Router();

router.post("/", createFunction);
router.get("/", getFunctions);
router.delete("/:id", deleteFunction);

// ✅ NEW ROUTE for executing function by ID
router.post("/execute/:id", executeFunctionById);

module.exports = router;
