import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to Database!");
  } catch (error) {
    console.log("Failed to connect to Database!", error.message);
    process.exit(1);
  }
};

export default connect;
// In this snippet, we have created a new file called connect.js and moved the database connection logic to this file. We have also exported the connect function so that it can be imported and used in server.js. This separation of concerns helps keep the codebase organized and makes it easier to maintain and debug.
