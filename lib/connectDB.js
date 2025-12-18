// import mongoose from "mongoose"

// const connectDB = async ()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log("mongoDB is Connected...")
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default connectDB



import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;
