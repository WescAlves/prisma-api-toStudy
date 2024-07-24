import { NextFunction } from "express";
import users from "../db";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function checkExistsUserAccount(req:Request, res:Response, next:NextFunction){
    const {username} : {username:string} = req.headers as {username:string};
    if(await prisma.user.findUnique({where:{username:username}})){
      next()
    }
    else{
      res.status(404).json("NOT FOUND")
    }
    
  }



  export default checkExistsUserAccount;