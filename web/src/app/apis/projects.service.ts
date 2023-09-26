import { APIError, APIMessage, ScreenInfo, ScreensInfo } from "@workspace/types/screens";
import api from "./api.service";

export class ProjectsService {

    private projectsPath : string = "/projects";

    public constructor(){};

    public async load() : Promise<ScreensInfo> {
        const screens : object = await api.get(this.projectsPath);
        return <ScreensInfo> screens;
    };

    public async create(project) : Promise<APIError | APIMessage> {
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