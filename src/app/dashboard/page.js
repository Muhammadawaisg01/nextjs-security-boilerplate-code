

"use client"

import { sendSignoutRequest, getLoggedInUser } from "@/utils/utils";
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Dashboard() { 

    // const cookie = cookies();
    const router = useRouter();
    const { data: session , status } = useSession();
    var [user, setUser] = useState(
        {
        name:"",
        email:"",
        role:""
    }
);

    // useEffect(() => {
    //     if (!session) {
    //         // If no session, redirect to login
    //         router.push("/signup_page");
    //     }
    // }, [session, router]);

    // const resolvedParams = React.use(params);

    // const { name } = resolvedParams;

    // const [email] = name || [];

    useEffect(() => {

        console.log("Component has been mounted");
        const func = async () => { 
            const response = await getLoggedInUser();

            console.log("In Dashboard, in  getLoggedInUser();  ",response);
            console.log("In Dashboard  in  getLoggedInUser();  ",response.data.role);
            setUser({ ...user, name: response.data.name,
                    role:response.data.role,
                    email:response.data.email,
                });
        }
        func();
        return async () => {
      }
    },[]);
    
    const handleSignOut = async () => {
        
        const response = await sendSignoutRequest();
        console.log("Response of Signout   ",response);
        await signOut({ callbackUrl: "/login_page" }); // Redirect to login page after signout
        router.push("/login_page"); // Ensure the client is redirected
    };
    
    // if (!session) return null; // Avoid rendering if no session is found

    return (
        <>
            <h1>Welcome! {user.name}</h1>
            <h1>Main {user.role} Dashboard</h1>
            <h4>Your email is  {user.email}</h4>
            <button onClick={handleSignOut}>Sign out</button>
        </>
    );
}



