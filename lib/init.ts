import config from "@lib/config";
import express from "express";
import WebSocket from "@wss";

export default class Init {

    public constructor(
        private web : express.Express,
        private api : express.Express,
        private wss : WebSocket
    ){};

    public load() : void {
        this.loadWeb();
        this.loadAPI();
        this.loadWSS();
    };

    public loadWeb() : void {
        if(!config.ONLY_API){
            this.web.listen(config.WEB_PORT, config.WEB_HOST, () => {
                console.log("Web server started sucessfully at " + config.WEB_HOST + ":" + config.WEB_PORT);
            });
        };
    };

    public loadAPI() : void {
        if(config.API_LISTEN_PORT || config.ONLY_API){
            const app : express.Express = express();
            app.use(config.API_URL_PATH, this.api);
            app.listen(config.API_PORT, config.API_HOST, () => {
                console.log("API server sucessfully started at " + config.API_HOST + ":" + config.API_PORT);
            });
        }else {
            this.web.use(config.API_URL_PATH, this.api);
            console.log("API sucessfully vinculed with web server!");
        };
    };

    public loadWSS() : void {
        if(!config.ONLY_API){
            this.wss.listen(config.WS_PORT, config.WS_HOST, () => {
                console.log("Web socket started sucessfully at " + config.WS_HOST + ":" + config.WS_PORT);
            });
        };
    };

};