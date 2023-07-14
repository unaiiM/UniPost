import * as express from "express";
import { default as PorjectsRouter } from "./routers/projects";
import { default as ScreensRouter } from "./routers/screens";
import { default as HistoryRouter } from "./routers/history";

const app : express.Express = express();
app.use("/projects", PorjectsRouter);
app.use("/screens", ScreensRouter);
app.use("/history", HistoryRouter);

export default app;