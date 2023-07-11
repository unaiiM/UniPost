import * as fs from 'fs';

export interface InitConfig {
    BASE_PATH : string;
    IMPORT_PATH : string;
    CONFIG_FILE : string;
    API_LISTEN_PORT : boolean;
    API_PORT : number;
    API_PATH : string;
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
};
class Config implements InitConfig {

    public BASE_PATH : string = process.cwd();
    public IMPORT_PATH : string = this.BASE_PATH + "/build";
    public CONFIG_FILE : string = this.BASE_PATH + "/assets/json/config.json";
    public API_LISTEN_PORT: boolean = false;
    public API_PATH: string = "/api";
    public API_PORT: number = 8080;
    public API_HOST: string = "0.0.0.0";
    public WEB_PATH: string = this.BASE_PATH + "/app/dist/app";
    public WEB_PORT: number = 80;
    public WEB_HOST: string = "0.0.0.0";
    public ONLY_API: boolean = false;
    public WS_HOST: string = "0.0.0.0";
    public WS_PORT: number = 4444;

    public constructor(cfg : Partial<InitConfig> = {}){
        Object.assign(this, cfg);
    };

    public save() : void {
        fs.writeFileSync(JSON.stringify(this), this.CONFIG_FILE);
    };

    public load() : void {
        const cfg : InitConfig = JSON.parse(fs.readFileSync(this.CONFIG_FILE).toString());
        Object.assign(this, cfg);
    };

};

const config : Config = new Config();
export default <Config> config;