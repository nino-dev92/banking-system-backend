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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAccount = exports.getHistory = exports.getBalance = exports.transfer = exports.withdraw = exports.deposit = exports.createAccount = void 0;
const service = __importStar(require("../services/accountServiceDB"));
const node_console_1 = require("node:console");
const createAccount = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const account = await service.createAccount(name, userId);
        res.status(201).json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createAccount = createAccount;
const deposit = async (req, res) => {
    try {
        const { name, amount } = req.body;
        const userId = req.user.id;
        const account = await service.deposit(name, amount, userId);
        res.json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.deposit = deposit;
const withdraw = async (req, res) => {
    try {
        const { name, amount } = req.body;
        const userId = req.user.id;
        const account = await service.withdraw(name, amount, userId);
        if (node_console_1.error)
            return res.status(401).json({ error: "Invalid account" });
        res.json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.withdraw = withdraw;
const transfer = async (req, res) => {
    try {
        const { sender, receiver, amount } = req.body;
        const userId = req.user.id;
        const result = await service.transfer(sender, receiver, amount, userId);
        res.json(result);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
};
exports.transfer = transfer;
const getBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        const balance = await service.getBalance(req.params.name, userId);
        res.json({ balance });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getBalance = getBalance;
const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await service.getHistory(req.params.name, userId);
        res.json({ history });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.getHistory = getHistory;
const getUserAccount = async (req, res) => {
    try {
        //const username = (req as any).user.username;
        const account = await service.getUserAccount(req.params.name);
        res.json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getUserAccount = getUserAccount;
