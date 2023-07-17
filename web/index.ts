import config from "../lib/config";
import express from "express";

const app : express.Express = express();

app.use(express.static(config.WEB_PATH));

app.route("/")
    .get((req : express.Request, res : express.Response) => {
        res.sendFile(config.WEB_PATH + "/index.html");
    });

export default app;