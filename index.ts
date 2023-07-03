import { default as api } from "./api";
import * as express from "express";
import { Express } from "express";
import Init from "./lib/init";

const app : Express = express();

const init : Init = new Init(app, api);
init.load();