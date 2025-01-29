
"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

import { signOut,signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import { sendLoginRequest } from "../login_page/page";
import networkRequest from "@/utils/networkRequest";

const Signup = () => {

    const { data: session , status } = useSession();
    
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (status === "loading") {
        return <h1>Loading...</h1>;
    }
    

    // google login
    const handleGoogleSignup = async () => {
        await signIn("google");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password == ""){
          alert("Please enter password");
        }else if (email == ""){
          alert("Please enter email");
        }else{
          const response = await sendSignupRequest(name, email, password);  
          
          console.log("I am the message     ",(response).data.message);
          console.log("I am the status      " ,(response).data.status);
          const status = response.data.status;

          if(status == 200){
            const response = await sendLoginRequest(email, password);
            if(response.data.status == 200){
              router.push("/dashboard");
            }else{
              alert(response.data.message);
            }
          }else if (status == 409){
              alert(response.data.message);
          }
        }
    };

    const sample_func = async (session) => { 
        const name = session.user?.name;
        const email = session.user?.email;
        
        const response = await sendSignupRequest(name,email);
        console.log("I am the message   sample_func  ", response.data.message);
        console.log("I am the status    sample_func  ",  response.data.status);

        if( response.data.status == 200 || response.data.status == 409) { 
            const response = await sendLoginRequest(email, null);
            router.push("/dashboard");
        }
        // else if(response.data.status == 409){
        //     const response = await sendLoginRequest(email, null);
        //     console.log("AAAAAAAAAA          ",response);
        //     router.push(`/dashboard`);
        // }
    }

    if(session){
        sample_func(session);
    }

    // useEffect(() => {

    //     if (session) {
    //         // Only execute sample_func when session exists
    //         const runSampleFunc = async () => {
    //             await sample_func(session);
    //         };
    //         runSampleFunc();
    //     }

    // }, [session?.user])
    


    return  session ? 
        (
            <div>
                <p>Welcome, {session.user?.name}!</p>
                <p>Your email is: {session.user?.email}</p>
                <button onClick={() => signOut()}>Sign out</button>
            </div>
        )  : 
    (
        <div className="container container-fluid">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-10 col-lg-5 ">
            <form
              className="border border-secondary rounded p-4"
              onSubmit={submitHandler}
            >
              <h1 className="mb-4">Signup</h1>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="name_field">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control w-full p-2 border border-gray-300 rounded text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email_field">
                  Email address
                </label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control w-full p-2 border border-gray-300 rounded text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
  
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="password_field">
                  Password
                </label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control w-full p-2 border border-gray-300 rounded text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
  
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                Sign in
              </button>
  
              <div className="text-center">
                <p>
                  already have an account? <Link href="/login_page">Login</Link>
                </p>
                <p>Or sign up with</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating-mx-1"
                  onClick={() => handleGoogleSignup()}
                >
                  <i className="fab fa-google"></i>
                </button>
                  <br/>
                <button
                  type="button"
                  className="btn btn-link btn-floating-mx-1"
                  onClick={() => signIn("github")}
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Signup;

export const sendSignupRequest = async (name, email, password) => {

  const response = await networkRequest({ 
    method:"POST" ,
    url:"signup" ,
    data:{name, email, password}
  });
  return response;
}

