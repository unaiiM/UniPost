import Tls, { TlsClientOptions as TCO } from "./tls";
import { Http } from "./http";
import * as net from "net";

interface __Listeners {
    onResponse : (struct : Http.ResponseStruct) => void;
    onError : (err : Error) => void;
    onClose : () => void;
};

class Request {

    private socket : net.Socket = new net.Socket();
    private tls : Tls;
    private http : Http = new Http();
    private listeners : Request.Listeners = {}; 

    public constructor(
        private options : Request.RequestOptions,
        listeners? : Request.Listeners
    ){
        this.listeners = listeners;
    };

    public connect() : void {
        this.socket.connect(this.options.port, this.options.host);

        this.socket.on("error", (err : Error) => this.fireEvent("onError", [err]));
        this.socket.on("close", () => this.fireEvent("onClose"));

        if(!this.options.tls || !this.options.tls.disabled){
            this.tls = new Tls(this.socket, <TCO> this.options.tls);
            this.tls.join(this.handleHttpRequest.bind(this));
        }else
            this.handleHttpRequest();
    };

    private handleHttpRequest() : void {
        this.socket.on("data", this.handleHttpResponse);
        this.socket.on("end", () => {
            this.socket.removeListener("data", this.handleHttpResponse);
        });

        this.http.instanceRequest(this.options.http); 
        const content : string = this.http.request.build();
        this.socket.write(content);
    };

    private handleHttpResponse(data : Buffer) : void {
        this.http.instanceResponse(data.toString());
        const struct : Http.ResponseStruct = this.http.response.extract();
        this.fireEvent("onResponse", [struct]);
    };

    private fireEvent(name : string, args : any[] = []){
        if(this.listeners[name]) this.listeners[name].apply(this, args);
    };

};


declare namespace Request {
    interface TlsClientOptions extends TCO {
        disabled : boolean;
    }
    
    interface RequestOptions {
        host : string;
        port : number;
        http? : Http.RequestOptions;
        tls? : TlsClientOptions;
    }
    
    type Listeners = Partial<__Listeners>;
};

export default Request;