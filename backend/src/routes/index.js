import { Router } from "express";
import { login, signup, refresh } from "./auth";

const routers = Router();

routers.post("/login", login);
routers.post("/signup", signup);
routers.get("/refresh", refresh);

export default routers;
