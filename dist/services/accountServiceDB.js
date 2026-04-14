"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAccount = exports.getHistory = exports.getBalance = exports.transfer = exports.withdraw = exports.deposit = exports.createAccount = void 0;
const Account_1 = require("../models/Account");
const today = new Date();
const time = `${today.toLocaleDateString()} - ${today.toLocaleTimeString()}`;
const createAccount = async (name, userId) => {
    const exists = await Account_1.Account.findOne({ name, userId });
    if (exists)
        throw new Error("Account already exists");
    const accNumber = Math.floor(10000 + Math.random() * 90000);
    const account = await Account_1.Account.create({
        name,
        accNumber,
        userId, // 🔥 link to user
    });
    return account;
};
exports.createAccount = createAccount;
const deposit = async (name, amount, userId) => {
    const account = await Account_1.Account.findOne({ name: name.toLowerCase(), userId });
    if (!account)
        throw new Error("Account not found");
    account.balance += amount;
    account.income += amount;
    account.history.push(`Deposit: ${amount} - ${time}`);
    await account.save();
    return account;
};
exports.deposit = deposit;
const withdraw = async (name, amount, userId) => {
    const account = await Account_1.Account.findOne({ name: name.toLowerCase(), userId });
    if (!account)
        throw new Error("Account not found");
    if (amount > account.balance) {
        throw new Error("Insufficient balance");
    }
    account.balance -= amount;
    account.spent += amount;
    account.history.push(`Withdraw: ${amount} - ${time}`);
    await account.save();
    return account;
};
exports.withdraw = withdraw;
const transfer = async (sender, receiver, amount, userId) => {
    try {
        const senderAcc = await Account_1.Account.findOne({
            name: sender.toLowerCase(),
            userId,
        });
        const receiverAcc = await Account_1.Account.findOne({ name: receiver.toLowerCase() });
        if (!senderAcc || !receiverAcc) {
            throw new Error("Account not found");
        }
        if (amount > senderAcc.balance) {
            throw new Error("Insufficient balance");
        }
        senderAcc.balance -= amount;
        senderAcc.spent += amount;
        receiverAcc.balance += amount;
        receiverAcc.income += amount;
        senderAcc.history.push(`Transfer to ${receiver.toLowerCase()}: ${amount} - ${time}`);
        receiverAcc.history.push(`Received from ${sender}: ${amount} - ${time}`);
        await senderAcc.save();
        await receiverAcc.save();
        return { senderAcc, receiverAcc };
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.transfer = transfer;
const getBalance = async (name, userId) => {
    try {
        const account = await Account_1.Account.findOne({ name, userId });
        if (!account)
            throw new Error("Account not found");
        return account.balance;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getBalance = getBalance;
const getHistory = async (name, userId) => {
    try {
        const account = await Account_1.Account.findOne({ name, userId });
        if (!account)
            throw new Error("Account not found");
        return account.history;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getHistory = getHistory;
const getUserAccount = async (username) => {
    try {
        const accounts = await Account_1.Account.findOne({ name: username });
        if (!accounts)
            throw new Error("Account not found");
        return accounts;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
exports.getUserAccount = getUserAccount;
