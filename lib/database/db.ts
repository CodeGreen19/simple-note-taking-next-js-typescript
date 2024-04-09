import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI;
const connect_db = async () => {
  if (mongoose.connection.readyState === 0) {
    console.log("disconnected");
  }
  if (mongoose.connection.readyState === 1) {
    console.log("already connected");
    return;
  }
  await mongoose.connect(mongo_uri!, {
    dbName: "next-note-taking",
    bufferCommands: false,
  });
  console.log("connected");
};

export default connect_db;
