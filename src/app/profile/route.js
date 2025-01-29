import { headers } from "next/headers";

import jwt from "jsonwebtoken"; 


export async function GET(request,{params} ) {
    
    const headers = new Headers(request.headers);

    console.log(headers);
    console.log(headers.get('authorization'));
    
    const authorization = headers.get('authorization');

    if(!authorization){
        return Response.json({
            message:"Please Login first"
        })
    }

    // const token = request.cookies.get('Security_token')?.value; // Get JWT from cookies

    console.log("I am the request in profile    ", request ) ; 
    const token = getTokenFromHeader(headers);

    console.log("TOKEN  ",token);

    try {
        var payload = jwt.verify(token, process.env.JWT_SECRET);
        var payload = jwt.decode(token);

        console.log("Payload   ", payload);
    } catch (error) {
        return Response.json({
            message : error
        })
    }

    return Response.json({

        title: ` ${payload.name}  Profile   `,
        data:{
            id:payload.id,
            name:payload.name,
            email:payload.email,
            role:payload.role,
            request:request
        }

        },{
            headers: {"Content-type" : "text/html" } 
        } 
    );
}


export const getTokenFromHeader = (headers) => { 
    
    const token = headers.get('authorization').substring(7);
    return token;
}






