import Screens, { Screen } from "./screens";

export type PorjectsObject = Record<string, Screens>;

export default class Projects {

    private projects : PorjectsObject;

    public constructor(projects : PorjectsObject = {}){
        this.projects = projects;
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

};