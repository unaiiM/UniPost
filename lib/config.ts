import * as fs from 'fs';
import base from "@json/base.json";

/*
    MYSQL_HOST : string;
    MYSQL_PORT : number;
*/
export interface InitConfig {
    BASE_PATH : string;
    IMPORT_PATH : string;
    CONFIG_FILE : string;
    API_LISTEN_PORT : boolean;
    API_PORT : number;
    API_URL_PATH : string;
    API_HOST : string;
    WEB_PATH : string;
    WEB_PORT : number;
    WEB_HOST : string;
    ONLY_API : boolean;
    WS_HOST : string;
    WS_PORT : number;
    MAX_HISTORY_SCREENS : number;
    MAX_PROJECTS : number;
    MAX_SCREENS : number;
    STORAGE_FILE : string;
};

class Config implements InitConfig {

    public BASE_PATH : string;
    public IMPORT_PATH : string;
    public CONFIG_FILE : string;
    public API_LISTEN_PORT : boolean;
    public API_URL_PATH : string;
    public API_PORT : number;
    public API_HOST : string;
    public WEB_PATH : string;
    public WEB_PORT : number;
    public WEB_HOST : string;
    public ONLY_API : boolean;
    public WS_HOST : string;
    public WS_PORT : number;
    public MAX_HISTORY_SCREENS : number;
    public MAX_PROJECTS : number;
    public MAX_SCREENS : number;
    public STORAGE_FILE : string;

    public constructor(cfg : Partial<InitConfig> = {}){
        if(!cfg.BASE_PATH) cfg.BASE_PATH = process.cwd();
        else this.BASE_PATH = cfg.BASE_PATH;
        this.setDefaultValues();
        this.joinBasePath(cfg);
        Object.assign(this, cfg);
    };

    public save() : void {
        fs.writeFileSync(this.CONFIG_FILE, JSON.stringify(this));
    };

    public load() : void {
        const cfg : InitConfig = JSON.parse(fs.readFileSync(this.CONFIG_FILE).toString());

        this.joinBasePath(cfg);
        Object.assign(this, cfg);
    };

    private setDefaultValues() : void {
        const values : Omit<InitConfig, "BASE_PATH"> = {
            IMPORT_PATH : "/build",
            CONFIG_FILE : "/assets/json/config.json",
            API_LISTEN_PORT : false,
            API_URL_PATH : "/api",
            API_PORT : 8080,
            API_HOST : "0.0.0.0",
            WEB_PATH : "/app/dist/app",
            WEB_PORT : 80,
            WEB_HOST : "0.0.0.0",
            ONLY_API : false,
            WS_HOST : "0.0.0.0",
            WS_PORT : 4444,
            MAX_HISTORY_SCREENS : 12,
            MAX_PROJECTS : 12,
            MAX_SCREENS : 32,
            STORAGE_FILE : "/assets/json/storage.json"
        };
        this.joinBasePath(values);
        Object.assign(this, values);
    };

    private joinBasePath(cfg : Partial<InitConfig>) : void {
        if(!this.BASE_PATH) throw new Error("Undefined base path on config file.");
        
        this.IMPORT_PATH = this.BASE_PATH + this.IMPORT_PATH;
        this.CONFIG_FILE = this.BASE_PATH + this.CONFIG_FILE;
        this.WEB_PATH = this.BASE_PATH + this.WEB_PATH;
        this.STORAGE_FILE = this.BASE_PATH + this.STORAGE_FILE;
    };

};

const config : Config = new Config({
    BASE_PATH: base.BASE_PATH
});
config.load();
config.save();
export default <Config> config;