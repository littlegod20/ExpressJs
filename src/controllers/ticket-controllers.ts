import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Ticket } from "../models/ticket.model";

export const getTicket = async (req: Request, res: Response): Promise<void> => {
  const selectedTicket = await Ticket.find();
  res.status(200).json({ success: true, data: selectedTicket });
};

export const postTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { passenger, flight } = req.body;

  if (!passenger && !flight) {
    res
      .status(400)
      .json({ success: false, msg: "Please submit ticketing details" });
    return;
  }

  const bookedTicket = await Ticket.create({
    id: uuidv4(),
    passenger,
    flight,
  });
  console.log(bookedTicket);

  res
    .status(200)
    .json({ success: true, msg: "Details have been submitted successfully" });
};

export const updateTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const ticketId = req.params.id;
    const { passenger, flight } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { passenger, flight },
      {
        new: true,
      }
    ).exec();

    if (!updatedTicket) {
      res.status(404).json({ error: "Ticket not found" });
      return;
    }
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: "Error updating ticket" });
  }
};

export const deleteTicket = async (
  req: Request,
  res: Response
): Promise<void> => {
  const ticketId = req.params.id;
  const deleteTicket = await Ticket.deleteOne({ _id: ticketId });

  if (!deleteTicket) {
    res.status(404).json({ success: false, msg: `No ticket matches your id` });
    return;
  }

  res.status(200).json({ success: true, msg: "Ticket deleted successfully" });
};
