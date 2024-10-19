import { Request, Response } from "express";
import createAbsolutePath from "../services/projectRoot";
import { writeToFile } from "../services/writeFileFunc";
import fs from "fs";
import { Data } from "../utils/types";

const filePath = createAbsolutePath("utils/booked.json");

export const getTicket = (req: Request, res: Response): void => {
  if (!fs.existsSync(filePath)) {
    res
      .status(404)
      .json({ success: false, msg: "Please submit ticket details first" });
    return;
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  if (!fileData) {
    res.status(404).json({ success: false, msg: "No data available" });
    return;
  }
  res.status(200).json({ success: true, data: JSON.parse(fileData) });
};

export const postTicket = (req: Request, res: Response): void => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    res
      .status(400)
      .json({ success: false, msg: "Please submit ticketing details" });
    return;
  }

  const bookedTicket = body;
  writeToFile(filePath, bookedTicket);

  res
    .status(200)
    .json({ success: true, msg: "Details have been submitted successfully" });
};

export const updateTicket = (req: Request, res: Response): void => {
  const { id } = req.params;
  const body = req.body;

  const fileData: Data[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
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

  fs.writeFileSync(filePath, JSON.stringify(updateFileData, null, 2));

  res.status(200).json({ success: true, data: updateFileData });
};

export const deleteTicket = (req: Request, res: Response): void => {
  const { id } = req.params;
  const fileData: Data[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let ticket = fileData.find((ticket) => ticket.id === Number(id));

  if (!ticket) {
    res.status(404).json({ success: false, msg: "No ticket matches your id" });
    return;
  }

  const updateFileData = fileData.filter((item) => item.id !== Number(id));

  fs.writeFileSync(filePath, JSON.stringify(updateFileData, null, 2));

  res.status(200).json({ success: true, msg: "Ticket deleted successfully" });
};
