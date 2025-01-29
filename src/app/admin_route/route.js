import { getTokenFromHeader } from "../profile/route";

import jwt from "jsonwebtoken"; 



export async function GET(request) {

    const headers = new Headers(request.headers);

    console.log(headers.get('authorization'));
    
    const authorization = headers.get('authorization');

    if(!authorization){
        return Response.json({
            message:"Please Login first"
        })
    }

    const token = getTokenFromHeader(headers) ; 
    
    console.log("TOKEN IN ADMIN_ROUTE        ",token);

     try {
        var payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Payload   ", payload);
    } catch (error) {
        return Response.json({
            message : error
        })
    }

    if(payload.role ==="ADMIN"){
        return Response.json({
            title: ` "${payload.name}"  Profile   `,
            message: `Welcome Admin Dashboard`
        })    
    }
    else{
        return Response.json({
            message:`not allowed for ${payload.role} `
        })    
    }

}





