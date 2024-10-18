const createAbsolutePath = require("../services/projectRoot");
const { writeToFile } = require("../services/writeFileFunc");
const fs = require("fs");

const filePath = createAbsolutePath("/presentation/utils/booked.json");

const getTicket = (req, res) => {
  if (!fs.existsSync(filePath)) {
    return res
      .status(404)
      .json({ success: false, msg: "Please submit ticket details first" });
  }
  const fileData = fs.readFileSync(filePath, "utf-8");
  if (!fileData) {
    return res.status(404).json({ success: false, msg: "No data available" });
  }
  res.status(200).json({ success: true, data: JSON.parse(fileData) });
};

const postTicket = (req, res) => {
  const body = req.body;

  if (Object.keys(body).length === 0) {
    return res
      .status(400)
      .json({ success: false, msg: "Please submit ticketing details" });
  }

  const bookedTicket = body;
  writeToFile(filePath, bookedTicket);

  res
    .status(200)
    .json({ success: true, msg: "Details have been submitted successfully" });
};

const updateTicket = (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let ticket = fileData.find((ticket) => ticket.id === Number(id));

  if (!ticket) {
    return res
      .status(404)
      .json({ success: false, msg: "No ticket matches your id" });
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

const deleteTicket = (req, res) => {
  const { id } = req.params;
  const fileData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let ticket = fileData.find((ticket) => ticket.id === Number(id));

  if (!ticket) {
    return res
      .status(404)
      .json({ success: false, msg: "No ticket matches your id" });
  }

  const updateFileData = fileData.filter((item) => item.id !== Number(id));

  fs.writeFileSync(filePath, JSON.stringify(updateFileData, null, 2));

  res.status(200).json({ success: true, msg: "Ticket deleted successfully" });
};

module.exports = { getTicket, postTicket, updateTicket, deleteTicket };
