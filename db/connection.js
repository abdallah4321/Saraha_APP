
import mongoose from "mongoose";

export const connection =()=>{
    mongoose.connect("mongodb+srv://abdallah123:abdallah123@cluster0.3z2q4k7.mongodb.net/")
    .then(()=>console.log("DBconnected"))
    .catch((err)=>console.log(`DB error${err}`))

}