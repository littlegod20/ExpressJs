import express from "express";

import {
  getTicket,
  postTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/ticket-controllers";

const router = express.Router();
router.get("/read-ticket", getTicket);

router.post("/book-ticket", postTicket);

router.put("/update-ticket/:id", updateTicket);

router.delete("/delete-ticket/:id", deleteTicket);

export default router;
