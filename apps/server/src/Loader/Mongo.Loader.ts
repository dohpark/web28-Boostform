/* eslint-disable no-console */
import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export default function connectMongoDB() {
  mongoose.connect(`mongodb://${process.env.MONGODB_HOSTNAME}:27017`, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("mongoDB is connected...");
    }
  });
}
