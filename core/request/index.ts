import Tls, { TlsOptions } from "../tls";
import Http, { 
        RequestOptions as HttpRequestOptions, 
        ResponseStruct as HttpResponseStruct 
} from "../http";

export interface RequestOptions {
    host : string;
    port : number;
    http : HttpRequestOptions;
    tls : TlsOptions;
};

export default class Request {

    public constructor(
        private options : RequestOptions
    ){};

};