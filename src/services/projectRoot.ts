import path from "path";
const projectRoot = path.resolve(__dirname, "..");

export default function createAbsolutePath(filePath: string) {
  return path.join(projectRoot, filePath);
}
