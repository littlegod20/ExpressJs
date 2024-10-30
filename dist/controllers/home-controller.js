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
exports.signUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email } = req.body;
    try {
        if (!name && !password) {
            res.status(400).json({
                success: false,
                msg: "please attach user name and password to the request body.",
            });
            return;
        }
        // hash user password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = { name, email, hashedPassword };
        const savedUser = yield user_models_1.User.create(user);
        res.status(201).json({
            success: true,
            msg: `${savedUser.name} has signed up successfully🎉.`,
        });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An internal server error occured");
        return;
    }
});
exports.signUp = signUp;
