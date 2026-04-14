import * as authService from "../services/authService.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
dotenv.config({ debug: true });
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.signup(username, password);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        const { accessToken, refreshToken } = token;
        await User.findOneAndUpdate({ username }, { refreshToken: refreshToken });
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
export const refresh = async (req, res) => {
    const refreshToken = req.cookies?.jwt;
    if (!refreshToken)
        return res.sendStatus(401);
    const user = await User.findOne({ refreshToken: refreshToken });
    if (!user)
        return res.sendStatus(404);
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const accessToken = jwt.sign({ id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
        res.json({ accessToken });
    }
    catch (error) {
        res.sendStatus(401);
    }
};
