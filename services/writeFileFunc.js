const fs = require("fs");

const writeTicketToFile = async (path, bookedTicket) => {
  let ticket = [];

  await getFile(path)
    .then((result) => (ticket = result ? JSON.parse(result) : []))
    .catch((err) => console.log(err));

  ticket.push(bookedTicket);

  await fs.promises.writeFile(path, JSON.stringify(ticket, null, 2), "utf-8");
};

const getFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = { writeTicketToFile, getFile };
