import { APIError, APIMessage, ScreenInfo, ScreensInfo } from "@workspace/types/screens";
import api from "./api.service";

export class ScreensService {

    private screensPath : string;

    public constructor(private type : string, private project? : string | undefined){
        if(!this.project) this.project = '';
        this.getScreensPath();
    };

    public getScreensPath() : void {
        switch(this.type){
            case 'project':
                this.screensPath = "/projects/" + this.project;
                break;
            case 'history':
                this.screensPath = "/history";
                break;
            default:
                this.screensPath = "/screens";
                break;
        };
    };

    public async load() : Promise<ScreensInfo> {
        const screens : object = await api.get(this.screensPath);
        return <ScreensInfo> screens;
    };

    public async create() : Promise<APIError | APIMessage> {
        const response : object = await api.post(this.screensPath, { action: 'add' });
        return <APIError | APIMessage> response;
    };
    
    public async delete(index : number) : Promise<APIError | APIMessage> {
        const response : object = await api.post(this.screensPath + "/" + index, { action: 'delete'});
        return <APIError | APIMessage> response;
    };

    public async modify(index : number, info : ScreenInfo) : Promise<APIError | APIMessage> {
        const response : object = await api.post(this.screensPath + "/" + index, { action: 'modify', screen: info });
        return <APIError | APIMessage> response;
    };

};