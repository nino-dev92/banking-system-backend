import type { Request, Response } from "express";
import * as service from "../services/accountServiceDB.js";
import { error } from "node:console";

export const createAccount = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req as any).user.id;

    const account = await service.createAccount(name, userId);

    res.status(201).json(account);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const deposit = async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;
    const userId = (req as any).user.id;

    const account = await service.deposit(name, amount as number, userId);

    res.json(account);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const withdraw = async (req: Request, res: Response) => {
  try {
    const { name, amount } = req.body;
    const userId = (req as any).user.id;

    const account = await service.withdraw(name, amount, userId);
    if (error as any) return res.status(401).json({ error: "Invalid account" });
    res.json(account);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const transfer = async (req: Request, res: Response) => {
  try {
    const { sender, receiver, amount } = req.body;
    const userId = (req as any).user.id;

    const result = await service.transfer(sender, receiver, amount, userId);

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getBalance = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const balance = await service.getBalance(req.params.name as string, userId);
    res.json({ balance });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const history = await service.getHistory(req.params.name as string, userId);
    res.json({ history });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserAccount = async (req: Request, res: Response) => {
  try {
    //const username = (req as any).user.username;
    const account = await service.getUserAccount(req.params.name as string);
    res.json(account);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
