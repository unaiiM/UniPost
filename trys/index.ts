import Request, { RequestOptions } from "../core/request";

const options : RequestOptions = {
    host: "192.168.3.174",
    port: 4444
};
const req : Request = new Request(options);
req.connect();