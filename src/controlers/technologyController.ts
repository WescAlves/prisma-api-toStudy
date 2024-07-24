import { Request, Response } from "express";
import { v4 } from "uuid";
import users from "../db";
import userController from "./userController";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function addTechnology(req:Request, res:Response){
    const {title, deadline}: {title:string, deadline:string} = req.body as {title:string, deadline:string}
    const newTechnology : Tecnology= {
        id:v4(),
        title,
        studied : false,
        deadline: new Date(deadline),
        created_at: new Date()
    }
    const {username} : {username:string} = req.headers as {username:string};
    const user = await prisma.user.findUnique({where:{username:username}})
    const tecnology = await prisma.tecnology.create({
        data: {
            id: v4(),
            title:title,
            studied:false,
            deadline:new Date(deadline),
            created_at: new Date(),
            username: username 
        }
    })
    res.status(200).json(tecnology);
}

async function getUserTechnologies(req:Request, res:Response){
    const {username} : {username:string} = req.headers as {username:string};
    const tecnologies = await prisma.tecnology.findMany({
        where:{
            username:username
        }
    })
    res.status(200).json(tecnologies);
}

async function deleteUserTechnology(req:Request, res:Response){
    const { id } : {id:string} = req.params as {id:string};
    const result = await prisma.tecnology.delete({where:{id:id}})
    res.status(203).json(result);
}

async function updateTechnology(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string};
    const {title, deadline} : {title:string, deadline:string} = req.body as {title:string, deadline:string}
    const tecnology = await prisma.tecnology.update({where:{id:id}, data:{title:title, deadline:new Date(deadline)}})
    res.status(202).json(tecnology)
}

async function updateStudiedTechnology(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string};
    const result = await prisma.tecnology.update({where:{id:id}, data:{studied:true}})
    res.status(202).json(result);
}

export default { addTechnology, getUserTechnologies,  deleteUserTechnology, updateTechnology, updateStudiedTechnology}