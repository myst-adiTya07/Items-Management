import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"
import { fileURLToPath } from "url"
import path from "path"
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Load the .env file from /backend (one level up)
dotenv.config({ path: path.resolve(__dirname, "../.env") });


connectDB()
.then(()=>{
app.listen(process.env.PORT || 8000 ,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed!!")
})