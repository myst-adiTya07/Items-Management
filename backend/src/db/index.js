import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async()=>{
    try {
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
       console.log(`\n mongodb connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("mongodb connection errror",error);
        process.exit(1);
    }
}

export default connectDB