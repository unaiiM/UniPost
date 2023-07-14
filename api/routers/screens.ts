import * as express from "express";
import { storage } from "@lib/storage";
import { initScreensRouter } from "api/lib/initScreensRouter";

const router : express.Router = express.Router();
initScreensRouter(router, storage.screens);

export default router;
