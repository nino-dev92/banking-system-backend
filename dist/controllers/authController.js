"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.signup = void 0;
const authService = __importStar(require("../services/authService"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
dotenv_1.default.config({ debug: true });
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.signup(username, password);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        const { accessToken, refreshToken } = token;
        await User_1.User.findOneAndUpdate({ username }, { refreshToken: refreshToken });
        res.cookie("jwt", refreshToken, {
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "lax",
            httpOnly: true,
            secure: false,
        });
        res.json({ accessToken: accessToken, username: username });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken)
        return res.sendStatus(401);
    const user = await User_1.User.findOne({ refreshToken: refreshToken });
    if (!user)
        return res.sendStatus(404);
    try {
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        res.json({ accessToken });
    }
    catch (error) {
        res.sendStatus(401);
    }
};
exports.refresh = refresh;
