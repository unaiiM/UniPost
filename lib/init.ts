import config from "lib/config.js";
import { Express } from "express";

export default class Init {

    public constructor(
        private web : Express,
        private api : Express
    ){};

    public load() : void {
        this.loadWeb();
        this.loadAPI();
    };

    public loadWeb() : void {
        if(!config.ONLY_API){
            this.loadAPI();

            this.web.listen(config.WEB_PORT, config.WEB_HOST, () => {
                console.log("Web server started sucessfully at " + config.WEB_HOST + ":" + config.WEB_PORT);
            });
        };
    };

    public loadAPI() : void {
        if(config.API_LISTEN_PORT){
            this.api.listen(config.API_PORT, config.API_HOST, () => {
                console.log("API server sucessfully started at " + config.API_HOST + ":" + config.API_PORT);
            });
        } else 
            this.web.use(config.API_PATH, this.api);
    };

};