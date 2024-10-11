const express = require("express");
const {
  getTicket,
  postTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticket-controllers");

const router = express.Router();
router.get("/read-ticket", getTicket);

router.post("/book-ticket", postTicket);

router.put("/update-ticket/:id", updateTicket);

router.delete("/delete-ticket/:id", deleteTicket);

module.exports = router;
