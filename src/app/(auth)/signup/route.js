
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt" ; 
import GoogleProvider from "next-auth/providers/google";
import { use } from "react";


const prisma = new PrismaClient() ; 


export const POST = async (req) => {

    const user = await req.json();

    console.log(user.name);
    console.log(user.email);
    console.log(user.password);

    prisma.$connect();

    if(user.password){
        var encrypted_pass = await bcrypt.hash(user.password,10) ; 
    }else{
        encrypted_pass="";
    }

    if(!user.role){
        user.role ="USER"
    }
    
    const User =  await prisma.user.findUnique({
        where: {
           email:user.email,
       }
    });

    console.log(User);

    if(User){
        return Response.json({
            message:"Email already exists!",
            status: 409
        })
    }

    await prisma.user.create({
        data:{
            name:user.name,
            email:user.email,
            password:encrypted_pass,
            role:user.role
        }
    });

    return Response.json(
        {
            message:"User created Successfully!",
            status: 200
        }
    ) ; 

}






