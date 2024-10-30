"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.localhost = "127.0.0.1";
        this.server = `${this.localhost}:27017`;
        this.database = "MyDatabase";
        this._connect();
    }
    _connect() {
        return mongoose_1.default
            .connect(`mongodb://${this.server}/${this.database}`)
            .then(() => {
            console.log("Database connection successful");
        })
            .catch((err) => {
            console.error(`Database connection failed ${err}`);
            throw err;
        });
    }
}
exports.Database = Database;
