import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model';
import { NextRequest,NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect();

export async function POST(request:NextRequest) {


    try {
        
        const reqBody = request.json(); 

        const { email, password}:any = reqBody;
        console.log(reqBody);

      const user = await User.findOne({email})
        
      if(user){
        return NextResponse.json({
          error:"User already exist",

        },{
            status:400
        })
      }

      console.log(user);

      const validPassword = await bcryptjs.compare(password, user.password)

      if(!validPassword){
        return NextResponse.json({
            error:"Check your credentials"
        },
        {
            status:400
        })
      }


        // token generation
         const tokenPayload = {
            id:user._id,
            username:user.username,
            email: user.email,
         }

       const token =    await jwt.sign(tokenPayload,process.env.TOKEN_SECRET!,{expiresIn:'1h'})


     const response =  NextResponse.json({
        message:"Logged In success",
        success:true,
      })

       // generate cookies 
     response.cookies.set("token",token,{
        httpOnly:true
      });

      return response;



    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        },{
            status:500
        })
    }


    
}