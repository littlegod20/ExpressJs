import express from "express";
import ticket_routes from "./routes/ticket-route";
import home_route from "./routes/home-route";
import { Application } from "express";
import authorizationToken from "./middlewares/authorization";
import { Database } from "./services/DB";

const mongo = new Database();
mongo
  ._connect()
  .then(() => {
    const app: Application = express();
    const port = 5000;

    app.use(express.json());
    app.use("/", home_route);
    app.use(authorizationToken);
    app.use("/api/ticket", ticket_routes);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
