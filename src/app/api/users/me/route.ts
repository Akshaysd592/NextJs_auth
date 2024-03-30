import {connect} from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server'
import { getDataFromToken } from './getDataFromToken'
import User from '@/models/user.model';

connect()

export async function POST(request:NextRequest) {
     try {
        // extract data from token 
         const userId =   await getDataFromToken(request) ;
   
         const user =  await  User.findOne({_id:userId}).select("-password")
         
         if(!user){
           return NextResponse.json({
               message:"User does not exist"
           })
         }
         return NextResponse.json({
           message:"user obtained successfully",
           data:user
         });
     } catch (error:any) {

        return NextResponse.json({
            error: error.message,
        },{
            status:500
        })
        
     }


}