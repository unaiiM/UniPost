import config from "@lib/config";
import * as fs from "fs";

export interface Screen {
    name : string,
    request : string;
    response : string;
};
export type Screens = Screen[];
export type Projects = Record<string, Screens>;

interface FileStruct {
    screens : Screens;
    projects : Projects;
    history : Screens;
};

export default class Storage implements FileStruct {

    private file : string;
    public screens: Screens = [];
    public projects: Projects = {};
    public history: Screens = [];

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

    public addScreen(screen : Screen) : void {
        this.screens.push(screen);
    };

    public deleteScreen(index : number) : void {
        this.screens.splice(index, 1);
    };

    public addHistory(screen : Screen) : void {
        this.history.push(screen);
    };

    public popHistory() : void {
        this.history.pop();
    };

    public addProjectScreen(name : string, screen : Screen) : void {
        this.projects[name]?.push(screen);
    };

    public deleteProjectScreen(name : string, index : number) : void {
        this.projects[name]?.splice(index, 1);
    };

    public modifyProjectScreen(name : string, index : number, screen : Screen) : void {
        if(this.existsProject(name)) this.projects[name][index] = screen;
    };

    public createProject(name : string) : void {
        if(!this.existsProject(name)) this.projects[name] = [];
    };

    public modifyProject(oldName : string, newName : string) : void {
        if(this.existsProject(newName) && !this.existsProject(newName)){
            this.projects[newName] = this.projects[oldName];
            delete this.projects[oldName];
        };
    };

    public existsProject(name : string) : boolean {
        return !(!this.projects[name]);
    };

    public getProject(name : string) : Screens {
        return this.projects[name];
    };

    public getProjects() : string[] {
        return Object.keys(this.projects);
    };

    public deleteProject(name : string) : void {
        delete this.projects[name];
    };

};