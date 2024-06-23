"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.register = exports.login = void 0;
const users_1 = require("../db/users");
const helpers_1 = require("../helpers");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        if (!user) {
            return res.sendStatus(400);
        }
        const expectedHash = (0, helpers_1.authentication)(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }
        const salt = (0, helpers_1.random)();
        user.authentication.sessionToken = (0, helpers_1.authentication)(salt, user._id.toString());
        await user.save();
        res.cookie('AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password, firstname, lastname, address } = req.body;
        if (!email || !password || !firstname || !lastname || !address) {
            return res.sendStatus(400);
        }
        const existingUser = await (0, users_1.getUserByEmail)(email);
        console.log(existingUser);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, helpers_1.random)();
        console.log((0, helpers_1.authentication)(salt, password));
        console.log(email);
        console.log(firstname);
        const user = await (0, users_1.createUser)({
            email,
            firstname,
            lastname,
            address,
            authentication: {
                salt,
                password: (0, helpers_1.authentication)(salt, password),
            },
        });
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.register = register;
const logout = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(req.body);
        if (!email) {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getUserByEmail)(email).select('+authentication.salt +authentication.password');
        console.log(user);
        if (!user) {
            return res.sendStatus(400);
        }
        user.authentication.sessionToken = null;
        await user.save();
        return res.status(200).json({ message: 'OK' }).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.logout = logout;
//# sourceMappingURL=authentication.js.map