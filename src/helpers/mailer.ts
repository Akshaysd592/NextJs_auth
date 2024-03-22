import User from '@/models/user.model';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
// import nodemailer, { TransportOptions } from 'nodemailer';


export const sendEmail = async({email,emailType,userId}:any)=>{
    try {   

        // todo:
        // if verification email then storing token to database and sending same in mail for verification
      const hashedToken  =   await bcryptjs.hash(userId.toString(),10)
        if(emailType ==="VERIFY"){
        await User.findByIdAndUpdate(userId,
            {
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }else if(emailType === "RESET"){
           await User.findByIdAndUpdate(userId,
            {
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
            })
        }


        // configure mail for usage 
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            }
          });

          const verifyTemplate = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
          to verify your email
          ${
              emailType ==="VERIFY"?"Verify Your Email ":"Reset Your Password"
          } or copy and paste the link below in your browser.
            <br/> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
              </p>`;

        const resetTemplate = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}></a>
           to reset your password
           or copy and paste the link below in your browser 
           <br/>
           ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
        </p>`

      const mailOptions ={
        from:"akshaypro@gmail.com",
        to:`${email}`,
        subject:emailType === "VERIFY"?"Verify Your Email":"Reset Your Password",
        html:`${emailType}==="VERIFY"? ${verifyTemplate}:${resetTemplate}`,
      }

      const mailresponse =  await transporter.sendMail(mailOptions)

      return mailresponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}