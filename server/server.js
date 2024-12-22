// Usually we need to require express but since the type is set to module in package.json we can import express now
import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import fs from "fs";
dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(auth(config));

// function to check if user exists in database

// routes
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file)=> {
  // import dynamic routes
  import(`./routes/${file}`).then((route)=> {
    app.use("/api/v1/", route.default);
  })
  .catch((error)=> {
    console.log("Error importing route", error);
  })
})

const server = async() => {
  try {
    await connect();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
}

server();