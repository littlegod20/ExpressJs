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
const projectRoot_1 = __importDefault(require("../services/projectRoot"));
const user_models_1 = require("../models/user.models");
const file = (0, projectRoot_1.default)("utils/users.json");
const validator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!(yield user_models_1.User.exists({ email: email }))) {
        res
            .status(404)
            .json({ success: false, msg: "Please sign up with details first" });
        return;
    }
    try {
        const foundUser = yield user_models_1.User.findOne({ email: email });
        if (foundUser) {
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
