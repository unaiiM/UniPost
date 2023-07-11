import { default as api } from "./api";
import { default as web } from "./app";
import Init from "./lib/init";
import WebSocket from "./wss";

const ws : WebSocket = new WebSocket();
const init : Init = new Init(web, api, ws);
init.load();