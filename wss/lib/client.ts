import * as ws from "ws";
import * as Core from "@core";

export default class Client {

    public constructor(
        private conn : ws.WebSocket
    ){
        this.handleClientEvents();
    };

    private handleClientEvents() : void {
        this.conn.on("message", (msg : string) => {
            const options : Core.Request.RequestOptions = JSON.parse(msg);
            this.handleRequest(options);
        });

        this.conn.on("close", () => {
            console.log("[Web Socket] Client disconnected!");            
        });
    };

    private handleRequest(options : Core.Request.RequestOptions) : void {
        const listeners : Core.Request.Listeners = {
            onResponse : this.onRequestResponse.bind(this),
            onError : this.onRequestError.bind(this)
        };
        const req : Core.Request.Request = new Core.Request.Request(options, listeners);
        req.connect();
    };

    private onRequestResponse(res : Core.Request.Http.ResponseStruct) : void {
        this.conn.send(JSON.stringify(res));
    };

    private onRequestError(err : Error) : void {
        this.conn.send(JSON.stringify({
            error : err.message
        }));
    };

};