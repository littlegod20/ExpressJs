"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ticket_route_1 = __importDefault(require("./routes/ticket-route"));
const home_route_1 = __importDefault(require("./routes/home-route"));
const authorization_1 = __importDefault(require("./middlewares/authorization"));
const DB_1 = require("./services/DB");
const mongo = new DB_1.Database();
mongo
    ._connect()
    .then(() => {
    const app = (0, express_1.default)();
    const port = 5000;
    app.use(express_1.default.json());
    app.use("/", home_route_1.default);
    app.use(authorization_1.default);
    app.use("/api/ticket", ticket_route_1.default);
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
})
    .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
