import { ScreensInfo, ScreensServiceInfo } from "@workspace/types/screens";

export class ScreensService {

    public constructor(private type : string, private project? : string | undefined){
        if(!this.project) this.project = '';
    };

    public load() : ScreensInfo {
        switch(this.type){
            case 'project':
                return this.loadProjectScreens();
            case 'history':
                return this.loadHistoryScreens();
            default:
                return this.loadScreens();
        };
    };

    private loadScreens() : ScreensInfo {
        const screens : ScreensInfo = [{
            name: "New window",
            project: '',
            description: ''
        }];

        return screens;
    };  

    private loadProjectScreens() : ScreensInfo {
        const screens : ScreensInfo = [{
            name: "New window",
            project: this.project,
            description: ''
        }];

        return screens;
    };  

    private loadHistoryScreens() : ScreensInfo {
        const screens : ScreensInfo = [{
            name: "New window (History)",
            project: this.project,
            description: ''
        }];

        return screens;
    };  

};