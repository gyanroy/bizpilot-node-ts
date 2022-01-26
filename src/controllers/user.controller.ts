import { Request, Response } from "express";
import { createUser, formUserReturnDocument, verifyUser } from "../services/user.service";

export async function createUserHandler(req: Request, res: Response){
    try {
        const userData = req.body;
        const userCreateRes = await createUser(userData);
        return res.send({
            user: formUserReturnDocument(userCreateRes),
            msg: 'Account Created'
        });
    } catch (error: any) {
        // throw new Error(`Error: ${error?.message}`);
        return res.status(400).send(`Error: ${error?.message}`)
    }
}

export async function loginUserHandler(req: Request, res: Response){
    try {
        const userData = req.body || {};
        const userCreateRes = await verifyUser(userData.email, userData.password);
        return res.send({
            user: formUserReturnDocument(userCreateRes),
            msg: 'Logged in'
        });
    } catch (error: any) {
        // throw new Error(`Error: ${error?.message}`);
        return res.status(400).send(`Error: ${error?.message}`)
    }
}