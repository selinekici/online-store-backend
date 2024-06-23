import express from "express";

import {get, merge} from 'lodash';

import {getUserBySessionToken} from "../db/users";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } =req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if(!currentUserId) {
            console.log("currentUserId: " +currentUserId);
            return res.sendStatus(403);
        }

        if(currentUserId.toString() !== id) {
            console.log(`currentuserid : ${currentUserId.toString()} id: ${id}`);
            return res.sendStatus(403);
        }

        next();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        console.log("is auntas");
        const sessionToken = req.cookies['AUTH'];
        if (!sessionToken) {
            console.log("sesssion token is null");
            return res.sendStatus(403);
        }

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) {
            console.log("userby session not found");
            return res.sendStatus(403);
        }

        merge(req, {identity: existingUser});

        return next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

