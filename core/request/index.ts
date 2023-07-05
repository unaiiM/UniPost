import Tls, { TlsClientOptions as TCO } from "../tls";
import { Http } from "../http";
import * as net from "net";

export interface TlsClientOptions extends TCO {
    disabled : boolean;
};

export interface RequestOptions {
    host : string;
    port : number;
    http? : Http.RequestOptions;
    tls? : TlsClientOptions;
};

interface Listeners {
    onConnect : string;
};

export type RequestListeners = Partial<Listeners>;

export default class Request {

    private socket : net.Socket = new net.Socket();
    private tls : Tls;
    private http : Http.RequestInstance = new Http.request();

    public constructor(
        private options : RequestOptions
    ){};

    public addListeners(listeners : RequestListeners){

    };

    public connect() : void {
        this.socket.connect(this.options.port, this.options.host);
        this.tls = new Tls(this.socket, this.options.tls);
        this.tls.join();
    };

    private handleEndTls() : void {
        this.http = new Http.request(); 
    };

};