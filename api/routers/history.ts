import express from "express";
import { storage } from "@lib/storage";
import utils from "api/lib/utils";

const router : express.Router = express.Router();
utils.screens.addScreenRouter(router, storage.history);

export default router;