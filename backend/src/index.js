"use-strict";
//Importing neccesary objects
import Express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

//Requring Routes
import routers from "./routes";

//Initializing Environment Variables
dotenv.config();

//Configuring port number
const port = process.env.PORT || "3001";

//Creating Express Instance
const app = Express();

//Configuring middleware
app.use(cors());
app.use(logger("dev"));
app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));
app.use(cookieParser());
//Index route
app.get("/", (req, res) => {
  res.status(200).send({ message: "Server is up & running on " + port });
});

//Routes
app.use("/api/v1", routers);

app.listen(port, e => {
    if (e) {
        console.log("Unable to start server");
        console.log(e);
        return;
    }
    console.log("Server up on : " + port);
});