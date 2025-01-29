import { headers } from "next/headers";

import jwt from "jsonwebtoken"; 


export async function GET(request) {
    
    const token = request.cookies.get('Security_token')?.value; // Get JWT from cookies

    console.log("I am the request in profile    ", request ) ; 

    console.log("TOKEN  ",token);

    try {
        var payload = jwt.verify(token, process.env.JWT_SECRET);
        var payload = jwt.decode(token);

        console.log("Payload   ", payload);
    } catch (error) {
        return Response.json({
            message : error,
            status:498
        })
    }

    return Response.json({
        status:200,
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
