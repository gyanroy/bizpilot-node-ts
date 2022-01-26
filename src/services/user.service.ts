import { User, UserCreateDocument, UserDocument, UserReturnDocument } from "../models/user.model";
import * as bcrypt from 'bcrypt';
import { FlattenMaps, LeanDocument } from "mongoose";
import { nanoid } from "nanoid";
import { Request, Response, NextFunction } from "express";
const BCRYPT_SALT_ROUND: number = Number(process.env.BCRYPT_SALT_ROUND);

export async function createUser(user: UserCreateDocument) {
    try {
        const userToCreate: any = {};
        const requiredKeys: Array<keyof UserCreateDocument> = ['email', 'password', 'name'];
        requiredKeys.forEach(async (userKey) => {
            if (userKey != 'password')
                userToCreate[userKey] = user[userKey];
            else {
                userToCreate[userKey] = bcrypt.hashSync(user[userKey], BCRYPT_SALT_ROUND);
            }
        });
        // adding custom id
        userToCreate._id = nanoid();
        const createUserRes = await (await User.create(userToCreate)).toJSON();
        return createUserRes;
    } catch (err: any) {
        throw new Error(`Create User Error: ${err}`);
    }
}

export async function verifyUser(email: string, password: string) {
    try {
        const userToVerify: any = {};
        userToVerify.email = email;
        const loginUserRes = await User.findOne(userToVerify, null, {lean: true});
        if (!loginUserRes) throw new Error('Account not found');
        if(!bcrypt.compareSync(password, loginUserRes.password)) throw new Error('Invalid credentials');;
        return loginUserRes;
    } catch (err: any) {
        throw new Error(`Login User Error: ${err}`);
    }
}

export function formUserReturnDocument(user: FlattenMaps<LeanDocument<UserDocument & { _id: any }>>) {
    const userReturnDoc: any = {};
    const requiredReturnKeys: Array<keyof UserReturnDocument> = ['email', 'name'];
    requiredReturnKeys.forEach((userKey) => {
        userReturnDoc[userKey] = user[userKey]
    });
    return userReturnDoc;
}

export function verifyCreateUserBody(req: Request, res: Response, next: NextFunction) {
    try {
        const reqBody = req.body || {};
        const requiredKeys: Array<keyof UserCreateDocument> = ['email', 'password', 'name'];
        requiredKeys.forEach((key) => {
            if (!(key in reqBody)) throw new Error(`${key} is required`);
        })
        if(!(reqBody.email as string).endsWith('.com')) throw new Error('Invalid email');

        next();
    } catch (error: any) {
        res.status(400).send(error?.message);
    }
}


export function verifyLoginUserBody(req: Request, res: Response, next: NextFunction) {
    try {
        const reqBody = req.body || {};
        const requiredKeys: Array<keyof UserCreateDocument> = ['email', 'password'];
        requiredKeys.forEach((key) => {
            if (!(key in reqBody)) throw new Error(`${key} is required`);
        })
        if(!(reqBody.email as string).endsWith('.com')) throw new Error('Invalid email');

        next();
    } catch (error: any) {
        res.status(400).send(error?.message);
    }
}