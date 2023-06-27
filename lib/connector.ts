import Config, { InitConfig } from "./config";

interface ConnectorStruct {
    ASSETS_PATH : string,
    CORE_PATH : string,
    API_PATH : string,
    LIB_PATH : string
};

export default class Connector implements ConnectorStruct {
  
    ASSETS_PATH: string = "/assets";
    CORE_PATH: string = "/core";
    API_PATH: string = "/api";
    LIB_PATH: string = "/lib";

    private config : InitConfig = new Config();

    public constructor(struct? : Partial<ConnectorStruct>){
        this.config.load();
        Object.assign(this, struct);
    };

    public joinBase(struct : Partial<ConnectorStruct>) : Partial<ConnectorStruct> {
        
        for(const key in struct){
            struct[key] = config.BASE_PATH + struct[key];
        };
    
    };

};