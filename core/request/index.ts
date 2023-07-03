import Tls, { TlsOptions } from "../tls";
import Http, { HttpOptions } from "../http";

export interface RequestOptions {
    host : string;
    port : number;
    http : HttpOptions;
    tls : TlsOptions;
};

export default class Request {

    public constructor(
        private options : RequestOptions;
    ){};

};