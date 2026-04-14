import mongoose from "mongoose";
const accountSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
export const Account = mongoose.model("Account", accountSchema);
