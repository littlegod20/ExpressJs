"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createAbsolutePath;
const path_1 = __importDefault(require("path"));
const projectRoot = path_1.default.resolve(__dirname, "..");
function createAbsolutePath(filePath) {
    return path_1.default.join(projectRoot, filePath);
}
