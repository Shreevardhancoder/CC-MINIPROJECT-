const { executeFunction } = require("./api/utils/executeFunction");
const path = require("path");

const runTests = async () => {
  console.log("🔁 Starting tests...");

  try {
    const jsPath = path.join(__dirname, "test-function", "function.js");
    const jsOutput = await executeFunction({
      language: "javascript",
      route: jsPath,
    });
    console.log("✅ JavaScript Output:\n", jsOutput);
  } catch (err) {
    console.error("❌ JavaScript Error:\n", err);
  }

  try {
    const pyPath = path.join(__dirname, "test-function", "hello.py");
    const pyOutput = await executeFunction({
      language: "python",
      route: pyPath,
    });
    console.log("✅ Python Output:\n", pyOutput);
  } catch (err) {
    console.error("❌ Python Error:\n", err);
  }
};

runTests();
