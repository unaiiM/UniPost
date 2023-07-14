import config from "@lib/config";
import Screens, { Screen } from "./lib/screens";
import Projects from "./lib/projects";
import * as fs from "fs";

interface FileStruct {
    screens : Screens;
    projects : Projects;
    history : Screens;
};

export default class Storage implements FileStruct {

    private file : string;
    public screens: Screens = new Screens();
    public projects: Projects = new Projects();
    public history: Screens = new Screens();

    public constructor(file : string = config.STORAGE_FILE){
        if(fs.existsSync(file)) this.file = file;
    };

    public load() : void {
        const json : string = fs.readFileSync(this.file).toString();
        const obj : FileStruct = JSON.parse(json);

        if(obj.screens) this.screens = obj.screens;
        if(obj.projects) this.projects = obj.projects;
        if(obj.history) this.history = obj.history;
    };

    public save() : void {
        const obj : FileStruct = {
            screens: this.screens,
            projects: this.projects,
            history: this.history
        };
        const json : string = JSON.stringify(obj);

        fs.writeFileSync(json, this.file);
    };

};

export {
    Projects,
    Screens,
    Screen
};