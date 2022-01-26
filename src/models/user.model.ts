import { Document, model, Schema } from "mongoose";

export interface UserDocument extends Document {
    email: string,
    password: string,
    name: string,

}

export type UserCreateDocument = {
    email: string,
    password: string,
    name: string
}

export type UserReturnDocument = {
    email: string,
    name: string
}

const userSchema = new Schema({
    _id: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    name: { type: String, minlength: 3, maxlength: 20, required: true }
}, {_id: false, timestamps: true})

export const User = model<UserDocument>('User', userSchema);