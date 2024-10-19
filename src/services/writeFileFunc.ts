import fs from "fs";
import { Data } from "../utils/types";

export const writeToFile = async (path: string, data: Data) => {
  let ticket = [];

  await getFile(path)
    .then((result) => (ticket = result ? JSON.parse(result as string) : []))
    .catch((err) => console.log(err));

  ticket.push(data);

  await fs.promises.writeFile(path, JSON.stringify(ticket, null, 2), "utf-8");
};

const getFile = (path: string) => {
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
