import config from "@lib/config";
import Screens, { Screen } from "./lib/screens";
import Projects, { PorjectsObject } from "./lib/projects";
import * as fs from "fs";

interface FileStruct {
    screens : Screen[];
    projects : PorjectsObject;
    history : Screen[];
};

export default class Storage {

    private file : string;
    public screens: Screens = new Screens();
    public projects: Projects = new Projects();
    public history: Screens = new Screens();

    public constructor(file : string = config.STORAGE_FILE){
        if(fs.existsSync(file)) this.file = file;
        else throw new Error("File doesn't exists!");
        this.load();
    };

    public load() : void {
        const json : string = fs.readFileSync(this.file).toString();
        const obj : FileStruct = JSON.parse(json);

        if(obj.screens) this.screens.join(obj.screens);
        if(obj.projects) this.projects.join(obj.projects);
        if(obj.history) this.history.join(obj.history);
    };

    public save() : void {
        const obj : FileStruct = {
            screens: this.screens.getAll(),
            projects: this.projects.getAll(),
            history: this.history.getAll()
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

export const storage : Storage = new Storage();