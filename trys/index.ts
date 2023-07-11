import * as Request from "../core/request";

const options : Request.RequestOptions = {
    host: "192.168.3.174",
    port: 4444
};
const req : Request.Request = new Request.Request(options);
req.connect();