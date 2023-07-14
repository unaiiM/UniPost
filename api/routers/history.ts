import * as express from "express";
import { storage } from "@lib/storage";
import { initScreensRouter } from "api/lib/globalScreensUtils";

const router : express.Router = express.Router();
initScreensRouter(router, storage.history);

export default router;