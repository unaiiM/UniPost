import { WebSocketServer, WebSocket as wsss } from "ws";
import Client from "./lib/client";

export default class WebSocket {
    
    private server : WebSocketServer;

    public constructor(){};

    public listen(port : number, host : string, cb : () => void) : void {
        this.server = new WebSocketServer({ port: port, host: host }, cb);
        
        this.server.on('connection', (conn : wsss) => {
            const client : Client = new Client(conn);
        });
    };
    
};