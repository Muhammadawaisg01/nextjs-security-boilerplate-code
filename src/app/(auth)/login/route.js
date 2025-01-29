

import { PrismaClient } from "@prisma/client"; 
import bcrypt from "bcrypt" ; 
import jwt from "jsonwebtoken"; 
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


const prisma = new PrismaClient() ; 


export const POST = async (req) => {
    const cookie = cookies();
    const user = await req.json();

    console.log(user.email);
    console.log(user.password);

    prisma.$connect();

    const User = await prisma.user.findUnique({
         where: {
            email:user.email,
        }
    });

    console.log("From Login API       ",User);

    if(!User){
        return Response.json({
            message:"unregistered email",
            status:403
        })
    }

    if(user.password){
        var decrypted_pass = await bcrypt.compare(user.password , User.password) ; 
        if(!decrypted_pass){
            return Response.json({
                message:"invalid password",
                status: 401
            })
        }
    }

    const payload = {
        id: User.id,
        name:User.name,
        email:User.email,
        role:User.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET , { 
        expiresIn: '1d'
    })

    await cookie.set("Security_token",token, {maxAge : 86400 });

    const response =  NextResponse.json(
        {
            message:"User Login Successful",
            user:{
                id:User.id,
                name:User.name,
                email:User.email,
                role:User.role
            },
            status:200,
            token:token
        }
    );
    response.cookies.set("Security_token", token);
    return response;

}






