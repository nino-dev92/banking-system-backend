"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: true });
const URL = process.env.URL;
const connectDB = async () => {
    try {
        const conn = await mongoose_1.default.connect(URL, {
            dbName: "accounts",
        });
        console.log("DB CONNECTED");
    }
    catch (error) {
        console.error("DB connection error:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
