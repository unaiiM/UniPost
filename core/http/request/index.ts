interface Options {
    version : number;
    path : string;
    method : string;
    query : Record<string, string>;
    body : Record<string, string>;
    headers : Record<string, string>;
};

export type HttpRequestOptions = Partial<Options>;

export default class HttpRequest {

    private CRLF : string = "\r\n";
    private options : Options = {
        version: 2.0,
        path: "/",
        method: "GET",
        query: {},
        body: {},
        headers: {}
    };

    public constructor(
        options : HttpRequestOptions
    ){
        Object.assign(this.options, options);
    };

    public build() : string {
        switch(this.options.version){
            case 0.9: 
                return "GET " + this.options.path + this.parseQuery();
            default:
                return this.buildLine() + this.buildHeaders() + (this.options.body ? this.options.body : "");
        };
    };

    /**
     * In the request line we place the HTTP method to be used, 
     * the URI of the request and the HTTP protocol to be used.
     */
    private buildLine() : string {
        return this.options.method + " " + this.options.path + this.parseQuery() + 
        " HTTP/" + this.options.version.toFixed(1) + this.CRLF;
    };

    /**
     * Each header is specified with a name, then two points, and 
     * then followed by the value of that header.
     */
    private buildHeaders() : string {
        let headers : string = "";

        for(const key in this.options.headers){
            const value : string = this.options.headers[key];
            headers += key + ": " + value + this.CRLF;
        };

        headers += this.CRLF;

        return headers;
    };

    public parseQuery() : string {
        let query : string = "";
        const keys : string[] = Object.keys(this.options.query);

        for(let i : number = 0; i < keys.length; i++){
            const key : string = keys[i];
            const value : string = this.options.query[key];

            if(i === keys.length - 1) query += key + "=" + value;
            else query += key + "=" + value + "&";
        };

        return query;
    };

};