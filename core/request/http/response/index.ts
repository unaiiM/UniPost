
export interface HttpResponseStruct {
    version : number;
    status? : number;
    message? : string;
    headers? : Record<string, string>;
    body? : string;
};

interface HttpResponseSections {
    status : string;
    headers : string[];
    body : string | undefined;
};

export default class HttpResponse {

    private CRLF : string = "\r\n";
    private sections : HttpResponseSections;

    public constructor(
        private response : string
    ){
        this.split();
    };

    private split() : void {
        const splited : string[] = this.response.split(this.CRLF);

        this.sections = {
            status: splited[0],
            headers: splited.slice(1, splited.length - 2),
            body: splited[splited.length - 1],
        };
    };

    public extract() : HttpResponseStruct {
        const version : number = this.getVersion(); 
        
        if(version){
            const struct : HttpResponseStruct = {
                version: version,
                status: this.getStatus(),
                message: this.getMessage(),
                headers: this.getHeaders(),
                body: this.sections.body
            };

            return struct;
        }else {
            const struct : HttpResponseStruct = {
                version : 0.9,
                body : this.response
            }
        };
    };

    private getVersion() : number {
        const ver : string = this.sections.status.split(" ")[0];
        const number : number = Number(ver.split("/")[1]);
        return number;
    };

    private getStatus() : number {
        const status : number = Number(this.sections.status.split(" ")[1]);
        return status;
    };

    private getMessage() : string {
        let msg : string = this.sections.status.split(" ")
            .slice(2)
            .join(" ");
        return msg;
    };

    private getHeaders() : Record<string, string> {
        let headers : Record<string, string> = {};

        for(const header of this.sections.headers){
            const splited : string[] = header.split(":");
            const key : string = splited[0];
            const value : string = splited.slice(1).join(":");
            
            headers[key] = value;
        };

        return headers;
    };

};