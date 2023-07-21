import express, { response } from "express";
import { default as PorjectsRouter } from "./routers/projects";
import { default as ScreensRouter } from "./routers/screens";
import { default as HistoryRouter } from "./routers/history";
import { storage } from "@lib/storage";

const app : express.Express = express();
app.use(express.json());
app.use(mainMiddleware)
app.use("/projects", PorjectsRouter);
app.use("/screens", ScreensRouter);
app.use("/history", HistoryRouter);

app.route("/")
    .get((req : express.Request, res : express.Response) => {
        res.json({
            message: "Wellcome to UniPost API!",
            version: "Under development",
            locations: ["projects", "screens", "history"]
        });
    });

app.route("/save")
    .get((req : express.Request, res : express.Response) => {
        storage.save();
        res.json({
            message: "Sucessfully saved!"
        });
    });

process.on("exit", () => {
    storage.save();
});

function mainMiddleware(req : express.Request, res : express.Response, next : express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next() 
};

export default app;