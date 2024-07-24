import { Request, Response } from "express";
import { v4 } from "uuid";
import users from "../db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getAll(req:Request, res:Response){
    const users = await prisma.user.findMany()
    res.status(200).json(users);
}

async function getById(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string}
    const user = await prisma.user.findUnique({where:{id:id}})
    res.status(200).json(user);
}

async function addUser(req:Request, res:Response){
    const {name, username} = req.body as {name:string, username:string};
    const newUser : User = {
        id:v4(),
        name,
        username,
        technologies: [] as Tecnology[]
    }
    const user = await prisma.user.create({
        data: {
            id:v4(),
            name: name,
            username: username
        }
    })
    res.status(201).json(user)
}

async function deleteUser(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string}
    const result = await prisma.user.delete({where:{id: id}})
    console.log('deletou')
    res.status(200).json(result);
}


export default {addUser, getAll, deleteUser, getById}