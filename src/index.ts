const express = require('express');
const app = express();
import {Request, Response} from 'express';
require('dotenv').config();
const PORT: number = Number(process.env.PORT);

import { connectToDB } from './services/mongo.service';

// routers import
const userRouter =  require('./routers/user.router'); 


app.use(express.json());

app.get('/api/health', (req: Request, res: Response) => {
    res.send('Server Health: OK');
})

app.use('/api/users', userRouter);

app.listen(PORT, async () => {
    try {
        console.log(`Server started at PORT: ${PORT}`);
        await connectToDB();
        console.log('DB connected');
    } catch(err: any) {
        console.log('Error while starting server', err);
    }
})