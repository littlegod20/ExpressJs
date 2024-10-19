"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = require("express");
const passwordValidator_1 = __importDefault(require("../middlewares/passwordValidator"));
const home_controller_1 = require("../controllers/home-controller");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/signUp", home_controller_1.signUp);
router.post("/logIn", passwordValidator_1.default, (req, res) => {
    var _a;
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jsonwebtoken_1.default.sign(user, (_a = process.env.ACCESS_TOKEN_SECRET) !== null && _a !== void 0 ? _a : "Secret");
    res.json({ accessToken: accessToken });
});
exports.default = router;
