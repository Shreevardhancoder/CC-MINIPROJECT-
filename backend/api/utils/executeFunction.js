const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

function generateTempFile(extension = "js") {
  const fileName = `temp_${crypto.randomBytes(6).toString("hex")}.${extension}`;
  const filePath = path.join(os.tmpdir(), fileName);
  return filePath;
}

function executeFunction({ language, code = "", route = "", input = "", runtime = "runc" }) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    // Handle warm-up
    if (input === "__warmup__") {
      console.log("⏱️ Warm-up triggered");
      const warmupCmd = `docker run --rm --runtime=${runtime} ${language === "python" ? "python-runtime" : "js-runtime"} echo "Warm-up complete"`;

      exec(warmupCmd, (err, stdout, stderr) => {
        if (err) return reject(stderr || err.message);
        return resolve("🟢 Warm-up done.");
      });
      return;
    }

    let filePath;
    let isTempFile = false;

    let image, command, extension;
    if (language === "python") {
      image = "python-runtime";
      extension = "py";
    } else if (language === "javascript") {
      image = "js-runtime";
      extension = "js";
    } else {
      return reject("Unsupported language");
    }

    if (code) {
      filePath = generateTempFile(extension);
      fs.writeFileSync(filePath, code);
      isTempFile = true;
    } else if (route) {
      filePath = path.resolve(route);
    } else {
      return reject("No code or route provided.");
    }

    const fileName = path.basename(filePath);
    const dirName = path.dirname(filePath);

    command = language === "python"
      ? `python /app/${fileName}`
      : `node /app/${fileName}`;

    const inputCommand = input ? `echo "${input}" | ` : "";

    const dockerCommand = `${inputCommand}docker run --rm --runtime=${runtime} -v ${dirName}:/app ${image} ${command}`;

    console.log(`🚀 Executing with command: ${dockerCommand}`);

    exec(dockerCommand, (err, stdout, stderr) => {
      const duration = Date.now() - startTime;

      if (isTempFile && fs.existsSync(filePath)) fs.unlinkSync(filePath);

      if (err) {
        console.error("❌ Execution error:", stderr || err.message);
        return reject(`Execution failed (${duration}ms): ${stderr || err.message}`);
      }

      console.log(`✅ Execution completed in ${duration}ms`);
      return resolve(stdout.trim());
    });
  });
}

module.exports = { executeFunction };

