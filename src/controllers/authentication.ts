import express from "express";
import {createUser, getUserByEmail} from "../db/users";
import {authentication, random} from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        console.log(req.body);
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }
        const expectedHash = authentication(user.authentication.salt, password);

        if (user.authentication.password !== expectedHash) {
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('AUTH', user.authentication.sessionToken, {domain: 'localhost', path: '/'});

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register = async (req: express.Request, res: express.Response) => {
    try {
        console.log(req.body);
        const {email, password, firstname, lastname, address} = req.body;


        if (!email || !password || !firstname || !lastname || !address) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        console.log(existingUser);
        if (existingUser) {
            return res.sendStatus(400);
        }

        const salt = random();
        console.log(authentication(salt, password));
        console.log(email);
        console.log(firstname);
        const user = await createUser({
            email,
            firstname,
            lastname,
            address,
            authentication:
                {
                    salt,
                    password: authentication(salt, password),
                },
        });

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {
        const {email} = req.body;
        console.log(req.body);
        if (!email) {
            return res.sendStatus(400);
        }
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
    console.log(user);
        if (!user) {
            return res.sendStatus(400);
        }

        user.authentication.sessionToken = null;

        await user.save();


        return res.status(200).json({message: 'OK'}).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

