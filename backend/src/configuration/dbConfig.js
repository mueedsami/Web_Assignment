import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const DBURL = process.env.MONGODB_URI;

if (!DBURL) {
  console.error("ERROR: DBURL is undefined!");
}

mongoose.connect(DBURL);

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export default mongoose;
