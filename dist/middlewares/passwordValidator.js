"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const projectRoot_1 = __importDefault(require("../services/projectRoot"));
const file = (0, projectRoot_1.default)("utils/users.json");
const validator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email } = req.body;
    if (!fs_1.default.existsSync(file)) {
        res
            .status(404)
            .json({ success: false, msg: "Please sign up with details first" });
        return;
    }
    const users = JSON.parse(fs_1.default.readFileSync(file, "utf-8"));
    const user = users.find((item) => item.name === name && item.email === email);
    if (!users) {
        res.status(400).json({ success: false, msg: "Please signup first!" });
        return;
    }
    if (!user) {
        res
            .status(400)
            .json({ success: false, msg: "No user matches your credentials" });
        return;
    }
    try {
        if (user.hashedPassword &&
            (yield bcrypt_1.default.compare(password, user.hashedPassword))) {
            next();
        }
        else {
            res.json({
                success: false,
                msg: "Password does not match stored credential.",
            });
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An internal server error occured");
    }
});
exports.default = validator;
