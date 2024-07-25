import { Request, Response } from "express";
import { v4 } from "uuid";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


async function addTechnology(req:Request, res:Response){
    const {title, deadline, user}: {title:string, deadline:string, user:User} = req.body as {title:string, deadline:string, user: User}
    const tecnology = await prisma.tecnology.create({
        data: {
            id: v4(),
            title:title,
            studied:false,
            deadline:new Date(deadline),
            created_at: new Date(),
            username: user.username 
        }
    })
    res.status(200).json(tecnology);
}

async function getUserTechnologies(req:Request, res:Response){
    const {user} : {user:User} = req.body as {user:User};
    const tecnologies = await prisma.tecnology.findMany({
        where:{
            username:user.username
        }
    })
    res.status(200).json(tecnologies);
}

async function deleteUserTechnology(req:Request, res:Response){
    const { id } : {id:string} = req.params as {id:string};
    if(await prisma.tecnology.findUnique({where:{id:id}})){
        const result = await prisma.tecnology.delete({where:{id:id}})
        res.status(203).json(result);
    }
    else{res.status(404).json('Não encontrado')}
    
}

async function updateTechnology(req:Request, res:Response){
    
    const {id} : {id:string} = req.params as {id:string};
    const {title, deadline} : {title:string, deadline:string} = req.body as {title:string, deadline:string}
    if(await prisma.tecnology.findUnique({where:{id:id}})){
        const tecnology = await prisma.tecnology.update({where:{id:id}, data:{title:title, deadline:new Date(deadline)}})
        res.status(202).json(tecnology)
    }
    else{
        res.status(404).json('Tecnologia não encontrada!!')
    }
        
}

async function updateStudiedTechnology(req:Request, res:Response){
    const {id} : {id:string} = req.params as {id:string};
    if(await prisma.tecnology.findUnique({where:{id:id}})){
        const result = await prisma.tecnology.update({where:{id:id}, data:{studied:true}})
        res.status(202).json(result);
    }
    else{
        res.status(404).json('Tecnologia não encontrada!!')
    }

    
    
}

export default { addTechnology, getUserTechnologies,  deleteUserTechnology, updateTechnology, updateStudiedTechnology}