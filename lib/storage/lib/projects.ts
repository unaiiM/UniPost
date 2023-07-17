import Screens from "./screens";

export type PorjectsObject = Record<string, Screens>;

export default class Projects {

    private projects : PorjectsObject;

    public constructor(projects : PorjectsObject = {}){
        this.projects = projects;
    };

    public all() : PorjectsObject {
        return this.projects;
    };

    public names() : string[] {
        return Object.keys(this.projects);
    };

    public join(projects : PorjectsObject) : void {
        Object.assign(this.projects, projects);
    };

    public get(name : string) : Screens {
        return this.projects[name];
    };

    public exists(name : string) : boolean {
        return !(!this.projects[name]);
    };

    public create(name : string) : boolean {
        if(this.exists(name)) return false;
        this.projects[name] = new Screens();
        return true;
    };

    public delete(name : string) : void {
        delete this.projects[name];
    };

    public modify(oldName : string, newName : string) : boolean {
        if(this.exists(newName)) return false;
        this.projects[newName] = this.projects[oldName];
        delete this.projects[oldName];
        return true;
    };

};