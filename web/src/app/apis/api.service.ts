export class API {

    private protocol : string | undefined = undefined;
    private host : string | undefined = undefined;
    private path : string | undefined = "/api";
    private port : number | undefined = 8080;
    private url : string = ((this.protocol) ? this.protocol + ":" : window.location.protocol) + "//" + ((this.host) ? this.host : window.location.hostname) + ((this.port) ? ':' + this.port : ((window.location.port) ? ':' : '') + this.port) + ((this.path) ? this.path : '');

    public constructor() {};

    public post(path : string, body : object) : Promise<object> {
        return this.request("POST", path, body);
    };

    public get(path : string) : Promise<object> {
        return this.request("GET", path);
    };

    public request(method : string, path : string, body?: object) : Promise<object> {

        let options : object = {
            method: method
        };

        if(method === 'POST') 
            Object.assign(options, { 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

        return new Promise((resolv, reject) => {
            fetch(this.url + path, options)
                .then((res) => {
                    res.json()
                        .then((json : object) => { console.log(json); resolv(json); });
                });
        });
    };

};

export default new API();