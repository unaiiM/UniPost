import HttpRequest, { HttpRequestOptions } from "./request";
import HttpResponse, { HttpResponseStruct } from "./response";

class Http {
    public request: HttpRequest;
    public response: HttpResponse;

    public instanceRequest(options : HttpRequestOptions = {}){
        this.request = new HttpRequest(options);
    };

    public instanceResponse(data : string){
        this.response = new HttpResponse(data);
    };
};

declare namespace Http {
    type RequestOptions = HttpRequestOptions;
    type ResponseStruct = HttpResponseStruct;
    type Methods = "GET" | 
    "POST" | 
    "PUT" | 
    "DELETE" |
    "PATCH" |
    "HEAD" |
    "OPTIONS" |
    "TRACE" |
    "CONNECT";
    type Version = 0.9 | 
    1.0 | 
    1.1 | 
    2.0;
};

export default Http;