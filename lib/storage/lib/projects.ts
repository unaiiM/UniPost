import utils from "@shared/utils";
import ListInterface from "./list";
import Screens from "./screens";

export interface ProjectInfo {
    name : string;
    description : string;
};

export interface Project extends ProjectInfo {
    screens : Screens;
};

export type ProjectsList = Project[];
export type ProjectsInfoList = ProjectInfo[];

export default class Projects implements ListInterface {

    private projects : ProjectsList;
    public length : number = 0;
    private default : ProjectInfo = {
        name: "New project",
        description: ""
    };

    public constructor(projects : ProjectsList = []){
        this.projects = projects;
        this.length = projects.length;
    };

    public check(screen : ProjectInfo) : ProjectInfo {
        return <ProjectInfo> utils.global.mergeProps(this.default, screen);
    };

    public exists(index : number) : boolean {
        return index >= 0 && index < this.length;
    };

    public names() : string[] {
        return this.projects.map((project : Project) => project.name);
    };

    public generate(info : Partial<ProjectInfo> = {}) : Project {
        const project : Project = {
            name: (info.name) ? info.name : (this.default.name + " (" + this.length + ")"),
            description: (info.description) ? info.description : this.default.description,
            screens: new Screens()
        };

        return project;
    };

    public parseToInfo(project : Project) : ProjectInfo {
        const info : ProjectInfo = {
            name: project.name,
            description: project.description
        };
        
        return info;
    };

    public getAll() : ProjectsList {
        return this.projects;
    };

    public getAllInfo() : ProjectsInfoList {
        return this.projects.map((project : Project) => this.parseToInfo(project));
    };

    public join(projects : ProjectsList) : void {
        this.projects = this.projects.concat(projects);
    };

    public get(index : number) : ProjectInfo {
        return this.parseToInfo(this.projects[index]);
    };

    public getScreens(index : number) : Screens {
        return this.projects[index].screens;
    };

    public add(project? : ProjectInfo) : void {
        if(project){
            const refilledProjectInfo : ProjectInfo = Object.assign(this.check(project), this.default);
            this.projects.push(this.generate(refilledProjectInfo));
        }else this.projects.push(Object.assign({}, this.generate()));
        this.length++;
    };

    public delete(index : number) : boolean {
        if(!this.exists(index)) return false;
        this.projects.splice(index, 1);
        this.length--;
        return true;
    };

    public modify(index : number, project : Partial<ProjectInfo>) : boolean {
        if(!this.exists(index)) return false;
        const obj : Project = this.projects[index];
        utils.global.mergePropsReference(obj, project);
        return true;
    };

    public pop() : void {
        if(this.length > 0){
            this.projects.pop();
            this.length--;
        };
    };

    public clear() : void {
        this.projects = [];
        this.length = 0; 
    };

};