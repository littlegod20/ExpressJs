"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.updateTicket = exports.postTicket = exports.getTicket = void 0;
const uuid_1 = require("uuid");
const ticket_model_1 = require("../models/ticket.model");
const getTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const selectedTicket = yield ticket_model_1.Ticket.find();
    res.status(200).json({ success: true, data: selectedTicket });
});
exports.getTicket = getTicket;
const postTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { passenger, flight } = req.body;
    if (!passenger && !flight) {
        res
            .status(400)
            .json({ success: false, msg: "Please submit ticketing details" });
        return;
    }
    const bookedTicket = yield ticket_model_1.Ticket.create({
        id: (0, uuid_1.v4)(),
        passenger,
        flight,
    });
    console.log(bookedTicket);
    res
        .status(200)
        .json({ success: true, msg: "Details have been submitted successfully" });
});
exports.postTicket = postTicket;
const updateTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticketId = req.params.id;
        const { passenger, flight } = req.body;
        const updatedTicket = yield ticket_model_1.Ticket.findByIdAndUpdate(ticketId, { passenger, flight }, {
            new: true,
        }).exec();
        if (!updatedTicket) {
            res.status(404).json({ error: "Ticket not found" });
            return;
        }
        res.json(updatedTicket);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating ticket" });
    }
});
exports.updateTicket = updateTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketId = req.params.id;
    const deleteTicket = yield ticket_model_1.Ticket.deleteOne({ _id: ticketId });
    if (!deleteTicket) {
        res.status(404).json({ success: false, msg: `No ticket matches your id` });
        return;
    }
    res.status(200).json({ success: true, msg: "Ticket deleted successfully" });
});
exports.deleteTicket = deleteTicket;
