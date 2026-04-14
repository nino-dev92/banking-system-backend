import * as service from "../services/accountServiceDB.js";
import { error } from "node:console";
export const createAccount = async (req, res) => {
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
export const deposit = async (req, res) => {
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
export const withdraw = async (req, res) => {
    try {
        const { name, amount } = req.body;
        const userId = req.user.id;
        const account = await service.withdraw(name, amount, userId);
        if (error)
            return res.status(401).json({ error: "Invalid account" });
        res.json(account);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const transfer = async (req, res) => {
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
export const getBalance = async (req, res) => {
    try {
        const userId = req.user.id;
        const balance = await service.getBalance(req.params.name, userId);
        res.json({ balance });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await service.getHistory(req.params.name, userId);
        res.json({ history });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
export const getUserAccount = async (req, res) => {
    try {
        //const username = (req as any).user.username;
        const account = await service.getUserAccount(req.params.name);
        res.json(account);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
