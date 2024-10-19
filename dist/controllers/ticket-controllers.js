"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.postTicket = exports.getTicket = void 0;
const projectRoot_1 = __importDefault(require("../services/projectRoot"));
const writeFileFunc_1 = require("../services/writeFileFunc");
const fs_1 = __importDefault(require("fs"));
const filePath = (0, projectRoot_1.default)("utils/booked.json");
const getTicket = (req, res) => {
    if (!fs_1.default.existsSync(filePath)) {
        res
            .status(404)
            .json({ success: false, msg: "Please submit ticket details first" });
        return;
    }
    const fileData = fs_1.default.readFileSync(filePath, "utf-8");
    if (!fileData) {
        res.status(404).json({ success: false, msg: "No data available" });
        return;
    }
    res.status(200).json({ success: true, data: JSON.parse(fileData) });
};
exports.getTicket = getTicket;
const postTicket = (req, res) => {
    const body = req.body;
    if (Object.keys(body).length === 0) {
        res
            .status(400)
            .json({ success: false, msg: "Please submit ticketing details" });
        return;
    }
    const bookedTicket = body;
    (0, writeFileFunc_1.writeToFile)(filePath, bookedTicket);
    res
        .status(200)
        .json({ success: true, msg: "Details have been submitted successfully" });
};
exports.postTicket = postTicket;
const updateTicket = (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const fileData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    let ticket = fileData.find((ticket) => ticket.id === Number(id));
    if (!ticket) {
        res.status(404).json({ success: false, msg: "No ticket matches your id" });
        return;
    }
    const updateFileData = fileData.map((item) => {
        if (item.id === Number(id)) {
            item = body;
        }
        return item;
    });
    fs_1.default.writeFileSync(filePath, JSON.stringify(updateFileData, null, 2));
    res.status(200).json({ success: true, data: updateFileData });
};
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => {
    const { id } = req.params;
    const fileData = JSON.parse(fs_1.default.readFileSync(filePath, "utf-8"));
    let ticket = fileData.find((ticket) => ticket.id === Number(id));
    if (!ticket) {
        res.status(404).json({ success: false, msg: "No ticket matches your id" });
        return;
    }
    const updateFileData = fileData.filter((item) => item.id !== Number(id));
    fs_1.default.writeFileSync(filePath, JSON.stringify(updateFileData, null, 2));
    res.status(200).json({ success: true, msg: "Ticket deleted successfully" });
};
exports.deleteTicket = deleteTicket;
