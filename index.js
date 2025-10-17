import express from 'express';
import connectDB from './lib/connectDB.js';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import webhookRouter from './routes/webhook.route.js'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors(process.env.CLIENT_URL))
app.use(clerkMiddleware())
app.use("/webhooks",webhookRouter);
app.use(express.json())
const PORT = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get("/auth", (req, res) => {
//     const authState = req.auth;
//     res.json(authState);
// });

// app.get("/protect", (req, res) => {
//     const {userId} = req.auth;
//     if(!userId){
//         return res.status(401).json({message: "Unauthorized"});
//     }
//     res.status(200).json({message: "Protected route", userId});
// });

// app.get("/protect2",requireAuth(), (req, res) => {
    
//     res.status(200).json("Content");
// });


app.use("/users",userRouter)
app.use("/posts",postRouter)
app.use("/comments",commentRouter)

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message || "Something went wrong!", status: error.status || 500, stack: error.stack});
})


// let isConnected = false;
// async function connectToMongoDB(){
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     isConnected = true;
//     console.log("connected to MongoDB")
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error)
//   }
// }

// app.use((req, res, next)=>{
//   if(!isConnected){
//     connectToMongoDB();
//   }
//   next();
// })

app.listen(PORT, () => {
    connectDB();
    // console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
