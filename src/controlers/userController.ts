import { Request, Response } from "express";
import { v4 } from "uuid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getAll(req:Request, res:Response){
    const users = await prisma.user.findMany()
    res.status(200).json(users);
}

async function getById(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string}
    if(await prisma.user.findUnique({where:{id:id}})){
        const user = await prisma.user.findUnique({where:{id:id}})
        res.status(200).json(user);
     }
     else{
         res.status(404).json("Usuário não encontrado"); 
     }
    
}

async function addUser(req:Request, res:Response){
    const {name, username} = req.body as {name:string, username:string};
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
    if(await prisma.user.findUnique({where:{id:id}})){
        const user = await prisma.user.findUnique({where:{id:id}})
        const username = user?.username
       if(!await prisma.tecnology.findFirst({where:{username:username}})){
        const result = await prisma.user.delete({where:{id: id}})
            res.status(200).json(result);
       }
       else{
        res.status(401).json("Não foi possível excluir, pois existe ao menos uma tecnologia vinculada a esse usuário, por favor, exclua primeiro todas as tecnologias vinculadas.");
       }
    }
    else{
        res.status(404).json("Usuário não encontrado"); 
    }
    
}


export default {addUser, getAll, deleteUser, getById}