import HttpRequest, { HttpRequestOptions } from "./request";
import HttpResponse, { HttpResponseStruct } from "./response";

export type RequestOptions = HttpRequestOptions;
export type ResponseStruct = HttpResponseStruct;

export type HttpVersion = 0.9 | 
    1.0 | 
    1.1 | 
    2.0;

export type HttpMethods = "GET" | 
    "POST" | 
    "PUT" | 
    "DELETE" |
    "PATCH" |
    "HEAD" |
    "OPTIONS" |
    "TRACE" |
    "CONNECT";

export interface Http {
    request : typeof HttpRequest;
    response : typeof HttpResponse;
};

const http : Http = {
    request: HttpRequest,
    response: HttpResponse
};

export default http;