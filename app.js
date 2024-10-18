const express = require("express");
const ticket_routes = require("./routes/ticket-route");
const home_route = require("./routes/home-route");
const authorizationToken = require("./middlewares/authorization");
const app = express();
const port = 5000;

app.use(express.json());

app.use("/", home_route);

app.use(authorizationToken);
app.use("/api/ticket", ticket_routes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
