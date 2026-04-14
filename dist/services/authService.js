"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const User_1 = require("../models/User");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ debug: true });
const signup = async (username, password) => {
    const exists = await User_1.User.findOne({ username });
    if (exists)
        throw new Error("User already exists");
    const hashed = await bcryptjs_1.default.hash(password, 10);
    const user = await User_1.User.create({
        username,
        password: hashed,
    });
    return user;
};
exports.signup = signup;
const login = async (username, password) => {
    const user = await User_1.User.findOne({ username });
    if (!user)
        throw new Error("Invalid credentials");
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match)
        throw new Error("Invalid credentials");
    const accessToken = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5m" });
    const refreshToken = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
    return { accessToken, refreshToken };
};
exports.login = login;
