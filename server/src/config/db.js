import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    });
    console.log("connected successfully!");

    // Check the readyState property
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB connection is ready");
    } else {
      console.log("MongoDB connection is not ready");
    }

    return mongoose.connection;
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit with failure
  }
};

export { conn };
