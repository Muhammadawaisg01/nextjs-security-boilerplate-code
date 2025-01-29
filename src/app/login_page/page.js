"use client";

import Link from "next/link";
import React, { useState } from "react";

import { signOut,signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { sendSignupRequest } from "../signup_page/page";
import { baseUrl } from "@/utils/utils";
import networkRequest from "@/utils/networkRequest";


export const Login = () => {

    const { data: session , status } = useSession();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (status === "loading") {
        return <p>Loading...</p>;
      }
    
    //   if (!session) {
    //     return (
    //       <div>
    //         <p>You are not signed in</p>
    //         <button onClick={() => signIn("google")}>Sign in with Google</button>
    //       </div>
    //     );
    //   }
    //   else{
    //     console.log("Google Account Details     ",session ) ; 
    //   }

    const submitHandler = async (e) => {
        e.preventDefault();

        if(password == ""){
          alert("Please enter password");
        }else if (email == ""){
          alert("Please enter email");
        }else{
            const response = await sendLoginRequest(email, password);
          
            const status = (response).data.status;
            console.log("I am the message     ",(response).data.message);
            console.log("I am the status      ",status);
            
            if(status == 200 ){
                router.push("/dashboard");
            }else{
                alert("status  -->  "+status+"\n"+response.data.message);
            }  
        }

        // try {
        //   const data = await signIn("credentials", {
        //     redirect: false,
        //     email,
        //     password,
        //   });

        //   console.log(data);
        // } catch (error) {
        //   console.log(error);
        // }

    };

    const sample_func = async (session) => { 
      const name = session.user?.name;
      const email = session.user?.email;
      
      // const response = await sendSignupRequest(name,email);
      // console.log("I am the message   sample_func  ", response.data.message);
      // console.log("I am the status    sample_func  ",  response.data.status);

      const response = await sendLoginRequest(email, null);
      if( response.data.status == 200) { 
        router.push("/dashboard");
      }else if(response.data.status == 403){
        const response = await sendSignupRequest(name,email);
        console.log("I am the second one      ", response);
        if(response.data.status == 200){
          const response = await sendLoginRequest(email, null);
          console.log("I am the third one      ", response);

          if( response.data.status == 200) { 
            router.push("/dashboard");
          }
        }
      }
    }

    if(session){
        sample_func(session);        
    }


  return  (
  // session ? 
  //   (
  //       <div>
  //           <p>Welcome, {session.user?.name}!</p>
  //           <p>Your email is: {session.user?.email}</p>
  //           <button onClick={() => signOut()}>Sign out</button>
  //       </div>
  //   )  : 
    // (
        <div className="container container-fluid">
        <div className="row mt-5 d-flex justify-content-center">
          <div className="col-10 col-lg-5 ">
            <form
              className="border border-secondary rounded p-4"
              onSubmit={submitHandler}
            >
              <h1 className="mb-4">Login</h1>
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
                  Not a member? <Link href="/signup_page">Register</Link>
                </p>
                <p>Or sign up with</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating-mx-1"
                  onClick={() => signIn("google")}
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

export default Login;

export const sendLoginRequest = async (email, password) => {
  
  const response = await networkRequest({ 
    method:"POST" ,
    url:"login" ,
    data:{email, password}
  });

  return response;
}
