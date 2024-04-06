'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Link from "next/link";



export default function SignupPage(){

    const router = useRouter();
    const [user,setUser] = useState({
        email:"",
        password:"",
        username:"",
    })

    const [buttonDisabled,setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSignup = async()=>{
        try {
           setLoading(true);
         
         const response =  await  axios.post('/api/users/signup',user)

         console.log("Signup success",response.data);
         router.push('/login');

            
        } catch (error:any) {
            console.log("Signup Failed");
            setLoading(false);
            toast.error(error.message);

        }
    }

   useEffect(()=>{
    if(user.email.length >0  && user.password.length >0 && user.username.length >0){
        setButtonDisabled(false);

    }
    else{
        setButtonDisabled(true);

    }

   },[user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            <h1>{loading?"Processing":"Signup"}</h1>
            <hr/>
            <label htmlFor="username">UserName</label>
            <input
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            name="username"
            id="username"
            value={user.username}
            onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder="Enter your userName"
            />
            <label htmlFor="email">Email</label>
            <input
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            name="email"
            id="email"
            value={user.email}
            onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="Enter your Email"
            />
            <label htmlFor="password">Password</label>
            <input
            className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="text"
            name="password"
            id="password"
            value={user.password}
            onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="Enter your password"
            />
            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none
            focus:border-gray-600 ">
            
            {
            buttonDisabled ? ("No Signup"):("Signup")
            }

            </button>
            <Link href={'/login'}>Visit Login page</Link>

        </div>
    )
}

