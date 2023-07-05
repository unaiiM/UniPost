import HttpRequest, { HttpRequestOptions } from "./request";
import HttpResponse, { HttpResponseStruct } from "./response";

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

export namespace Http {
    export type RequestOptions = HttpRequestOptions;
    export type ResponseStruct = HttpResponseStruct;
    export type RequestInstance = HttpRequest;
    export type ResponseInstance = HttpResponse;
    export const request: typeof HttpRequest = HttpRequest;
    export const response: typeof HttpResponse = HttpResponse
};