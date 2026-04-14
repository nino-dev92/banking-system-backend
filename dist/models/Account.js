"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const accountSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    accNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    income: {
        type: Number,
        default: 0,
    },
    spent: {
        type: Number,
        default: 0,
    },
    history: {
        type: [String],
        default: [],
    },
    // 🔥 NEW FIELD
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.Account = mongoose_1.default.model("Account", accountSchema);
