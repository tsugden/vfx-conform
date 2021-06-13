const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const {
      MONGO_URI,
      MONGO_USER_USERNAME,
      MONGO_USER_PASSWORD,
      MONGO_DATABASE_DEV,
    } = process.env;

    console.log("Connecting to db...", MONGO_URI);

    const conn = await mongoose.connect(MONGO_URI, {
      user: MONGO_USER_USERNAME,
      pass: MONGO_USER_PASSWORD,
      dbName: MONGO_DATABASE_DEV,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (err) {
    console.log(err);
  }
};

const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected");
};

module.exports = { connectDB, disconnectDB };
