// each time we will require a db connection function 
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.model'
// getting data next => ctr+ space for options in it {}
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect();

// function name will be post , get , etc
export async function POST(request:NextRequest){
    try {
       const reqBody =  request.json();
       // destructuring the data 
       const {username,email, password } = await reqBody;

       // validation pending
       console.log(reqBody);

      const user =  await User.findOne({email})


       if(user){
           return NextResponse.json({
            error:"User already Exists",
           },
           {status:400})
       } 


       // password hashing
      const salt = await bcryptjs.genSalt(10);
    const hashedPassword = bcryptjs.hash(password,salt);


      const newUser =  new User({
          username,
          email,
          password: hashedPassword,
       })


       const savedUser = await newUser.save();
       console.log(savedUser);

       // send verification email
       await sendEmail({email,emailType:"VERIFY",userId:savedUser._id});

        return NextResponse.json({
            message:"User registered successfully",
            success:true,
            savedUser
        })
   

    } catch (error:any) {
      return NextResponse.json({
        error: error.message
      },{
        status:500
      })
    }
}

// automatically routes will be created 
// localhost:3000/api/users/signup
