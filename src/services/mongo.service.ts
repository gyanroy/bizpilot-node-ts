import { connect } from "mongoose";

const DBURI: string = process.env.DBURI as string;

export async function connectToDB() {
    return connect(DBURI);
}