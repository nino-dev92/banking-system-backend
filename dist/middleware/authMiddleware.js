"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET as string;
const protect = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = header.split(" ")[1];
    // jwt.verify(
    //   token!,
    //   process.env.ACCESS_TOKEN_SECRET as string,
    //   (err: any, user) => {
    //     if (err) return res.status(401).json({ error: "Invalid Token" });
    //     (req as any).user = user;
    //     next();
    //   },
    // );
    try {
        // Get userId from token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.protect = protect;
