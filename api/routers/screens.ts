import express from "express";
import { storage } from "@lib/storage";
import { ScreensRouter } from "api/lib/globalScreensUtils";

const router : express.Router = express.Router();
ScreensRouter(router, storage.screens);

export default router;
