const path = require("path");
const projectRoot = path.resolve(__dirname, "..", "..");

const createAbsolutePath = (filePath) => {
  return path.join(projectRoot, filePath);
};

module.exports = createAbsolutePath;
