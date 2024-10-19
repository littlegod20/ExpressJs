"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authorizationToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authorizationToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        res.status(401).json({ msg: "Unauthorized, Access denied" });
        return;
    }
    if (!process.env.ACCESS_TOKEN_SECRET) {
        res.status(500).send("Server error: undefined secret key");
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ msg: "Token has expired." });
            return;
        }
        req.user = user;
        next();
    });
}
