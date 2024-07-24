import express from 'express';
import { Request, Response, NextFunction } from "express";
const app = express();
app.use(express.json());
const port = 3000;
import userRouter from './routes/userRouter';
import technologyRouter from './routes/technologyRouter'
import users from './db';



app.use('/user', userRouter);
app.use('/technology', technologyRouter);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

