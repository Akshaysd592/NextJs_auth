import mongoose from "mongoose";


export async function connect(){
        try {
          await  mongoose.connect(process.env.MONGO_URL!) // this connect function need garentied that the url will come so using !
            const connection = mongoose.connection
            connection.on(
                "connected",()=>{
                    console.log("Mongodb connected")
                }
            )

            connection.on("error",(error)=>{
                console.log("Mongodb connection Error Please make sure db is up and running ",error)
                process.exit();
            })
        } catch (error) {
            console.log("Something went wrong in connecting to DB")

            console.log(error);
        }
}