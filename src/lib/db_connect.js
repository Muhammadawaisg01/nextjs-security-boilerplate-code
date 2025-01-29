
import mongoose from "mongoose";

const db_url = process.env.DATABASE_URL ; 

console.log("MongoDB URI:", db_url);


if (!db_url) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  let cached = global.mongoose;
  
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  
  async function dbConnect() {
    if (cached.conn) {
      return cached.conn;
    }
  
    if (!cached.promise) {
      const opts = { useNewUrlParser: true, useUnifiedTopology: true,  family: 4 };
      console.log("First");
      cached.promise = await mongoose.connect(db_url, opts).then((mongoose) => {
        console.log("Second");
        return mongoose;
      });
    }
    console.log("Third");
    cached.conn = await cached.promise;
    return cached.conn;
  }
  
  export default dbConnect;
