"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, users_1.getUsers)();
        return res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await (0, users_1.deleteUserById)(id);
        return res.json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        console.log("updateuser icinden");
        const { id } = req.params;
        const { email } = req.body;
        if (!email) {
            console.log("email is null");
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getUserById)(id);
        user.email = email;
        await user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await (0, users_1.deleteUserById)(id);
        return res.json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.removeProduct = removeProduct;
//# sourceMappingURL=users.js.map