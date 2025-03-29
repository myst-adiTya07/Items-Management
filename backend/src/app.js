import express from "express"
import cors from "cors"

import itemRoutes from "../src/routes/itemRoutes.js" 

const app = express();

app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


// app.use("/api/v1/users",userRouter)
// app.post("/health", async (req,res)=>{
//     try {

//         const {demographicData,healthData} = req.body;

//         const newUser = new User(demographicData);
//         await newUser.save({validateBeforeSave : false});

//         const newHealth = new Health({...healthData , userData : newUser._id });
//         await newHealth.save({validateBeforeSave : false});

//         res.status(201).json(
//             new ApiResponse(200 , {user : newUser, health : newHealth} , "submitted data successfully")
//         )
//     } catch (error) {
//         console.error("Error in saving data " , error)
//         res.status(500).json( new ApiError(500,"failed to save data"))
//     }
// })

// app.get("/users" , async (req,res)=> {
//     try {
//         const users = await Health.find().populate("userData");
//         res.status(200).json(new ApiResponse(200 , users , "Succefully retreive the data"));
//     } catch (error) {
//         console.error("Error in retreiving data " , error)
//         res.status(500).json( new ApiError(500,"failed to retrieve data"))
//     }
// })

// app.get("/users/:id" , async (req,res) => {
//     try {
//         // console.log("Received ID:", req.params.id);
//         const userId = new mongoose.Types.ObjectId(req.params.id)
//         // console.log("Received userId type:",  userId);

//         const health = await Health.findById(userId);
//         // console.log("Received user:", user);
//         const user = await User.findById(health.userData);
//         // console.log("Received user:", health);


//         if(!user || !health){
//             return res.status(404).json(
//                 new ApiError(404,"User Not Found!!")
//             )
//         }

//         res.status(200).json({
//             user,health
//         })

//     } catch (error) {
//         console.error("Error fetching user details: " , error)
//         res.status(500).json( new ApiError(500,"Failed to fetch user details"))
//     }
// })

app.use("/api/items",itemRoutes);


export{app}