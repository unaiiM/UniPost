import * as express from "express";
import { default as PorjectsRouter } from "./routers/projects";
import config from "@lib/config.js";

const app : express.Express = express();
app.use("/projects", PorjectsRouter);

export default app;