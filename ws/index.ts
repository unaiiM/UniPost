import * as ws from "ws";
import * as Core from "../core";
import Client from "./lib/client";

class WebSocket {
    
    private server : ws.Server = new ws.Server({ port: 7071 });
    private clients = new Map();

    public constructor(){
        this.server.on('connection', (conn : ws.WebSocket) => {
            const client = new Client(conn);
        });
    };
    
};