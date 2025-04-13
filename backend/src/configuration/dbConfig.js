import mongoose from "mongoose";
import dotenv from "dotenv";
import createAdminAcc from "../scripts/admin.js";

dotenv.config();


const DBURL = process.env.MONGODB_URI;

if (!DBURL) {
  console.error("ERROR: DBURL is undefined!");
}
else{
  console.log("MongoDB found");
}


mongoose.connect(DBURL, {
  
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});
createAdminAcc();
export default mongoose;
