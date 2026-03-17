const mongoose = require("mongoose");

const connectDB = async () => {
  const maxRetries = 10;
  for (let i = 1; i <= maxRetries; i++) {
    try {
      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      console.error(`DB connection attempt ${i}/${maxRetries} failed: ${error.message}`);
      if (i === maxRetries) {
        console.error("Could not connect to MongoDB after multiple retries. Exiting.");
        process.exit(1);
      }
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
};

module.exports = connectDB;
