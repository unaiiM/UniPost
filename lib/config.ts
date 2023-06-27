import * as fs from 'fs';

export interface InitConfig {
    BASE_PATH : string;
    BUILD_PATH : string;
    CONFIG_FILE : string;
};

export default class Config implements InitConfig {

    public BASE_PATH : string = process.cwd();
    public UILD_PATH : string = this.BASE_PATH + "/build";
    public CONFIG_FILE: string = this.BASE_PATH + "/assets/json/config.json";

    public constructor(cfg? : Partial<InitConfig>){
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