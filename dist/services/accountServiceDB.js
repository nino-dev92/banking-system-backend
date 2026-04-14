import { Account } from "../models/Account.js";
const today = new Date();
const time = `${today.toLocaleDateString()} - ${today.toLocaleTimeString()}`;
export const createAccount = async (name, userId) => {
    const exists = await Account.findOne({ name, userId });
    if (exists)
        throw new Error("Account already exists");
    const accNumber = Math.floor(10000 + Math.random() * 90000);
    const account = await Account.create({
        name,
        accNumber,
        userId, // 🔥 link to user
    });
    return account;
};
export const deposit = async (name, amount, userId) => {
    const account = await Account.findOne({ name: name.toLowerCase(), userId });
    if (!account)
        throw new Error("Account not found");
    account.balance += amount;
    account.income += amount;
    account.history.push(`Deposit: ${amount} - ${time}`);
    await account.save();
    return account;
};
export const withdraw = async (name, amount, userId) => {
    const account = await Account.findOne({ name: name.toLowerCase(), userId });
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
export const transfer = async (sender, receiver, amount, userId) => {
    try {
        const senderAcc = await Account.findOne({
            name: sender.toLowerCase(),
            userId,
        });
        const receiverAcc = await Account.findOne({ name: receiver.toLowerCase() });
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
export const getBalance = async (name, userId) => {
    try {
        const account = await Account.findOne({ name, userId });
        if (!account)
            throw new Error("Account not found");
        return account.balance;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const getHistory = async (name, userId) => {
    try {
        const account = await Account.findOne({ name, userId });
        if (!account)
            throw new Error("Account not found");
        return account.history;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
export const getUserAccount = async (username) => {
    try {
        const accounts = await Account.findOne({ name: username });
        if (!accounts)
            throw new Error("Account not found");
        return accounts;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
};
