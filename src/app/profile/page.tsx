'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("");

  const getUserDetails = async () => {
    try {
      const response = await axios.post("/api/users/me");
      console.log(response.data);
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error("User not fetched");
    }
  };

  const logOut = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout Success");
      router.push('/login');
    

    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  
   
return ( <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
    <h1>Profile Page</h1>
    <br/>
    <h2>{data === "" ? "Nothing ":
    (<Link href={`/profile/${data}`}>{data}</Link>)}</h2>
    <hr/>
    <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logOut}>Logout</button>
    <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User Details </button>
    </div>)
}
