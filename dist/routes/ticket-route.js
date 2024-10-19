"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_controllers_1 = require("../controllers/ticket-controllers");
const router = express_1.default.Router();
router.get("/read-ticket", ticket_controllers_1.getTicket);
router.post("/book-ticket", ticket_controllers_1.postTicket);
router.put("/update-ticket/:id", ticket_controllers_1.updateTicket);
router.delete("/delete-ticket/:id", ticket_controllers_1.deleteTicket);
exports.default = router;
