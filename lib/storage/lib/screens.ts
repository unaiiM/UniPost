import { Screen, ScreenInfo } from "@shared/types/storage";

interface ScreensNames {}

export default class Screens {
    
    private screens : Screen[] = [];
    public length : number = 0;
    public default : Screen = {
        name: 'New window',
        project: '',
        description: '',
        request: '',
        response: ''
    };
    
    constructor(screens : Screen[] = []){
        this.screens = this.screens.concat(screens);
    };

    public check(screen : Screen) : Screen {
        const checked : Screen = {
            name: screen.name,
            project: screen.project,
            description: screen.description,
            request: screen.request,
            response: screen.response
        };
        return checked;
    };

    public exists(index : number) : boolean {
        return index >= 0 && index < this.length;
    };

    public getAll() : Screen[] {
        return this.screens;
    };

    public names() : string[] {
        let names : string[] = [];
        this.screens.forEach((screen : Screen) => names.push(screen.name));
        return names;
    };

    public get(index : number) : Screen {
        return this.screens[index];
    };

    public getAllInfo() : ScreenInfo[] {
        return this.screens.map((screen : Screen) => this.parseToInfo(screen));
    };

    public parseToInfo(screen : Screen) : ScreenInfo {
        const info : ScreenInfo = {
            name: screen.name,
            project: screen.project,
            description: screen.description
        };
        return info;
    };

    public add(screen? : Screen) : void {
        if(screen){
            const refilledScreen : Screen = Object.assign(this.check(screen), this.default);
            this.screens.push(refilledScreen);
            this.length++;
        }else this.screens.push(Object.assign({}, this.default));
    };

    public join(screens : Screen[]) : void {
        this.screens = this.screens.concat(screens);
    };

    public delete(index : number) : boolean {
        if(!this.exists(index)) return false;
        this.screens.splice(index, 1);
        this.length--;
        return true;
    };

    public modify(index : number, screen : Partial<Screen>) : boolean {
        if(!this.exists(index)) return false;
        const obj : Screen = this.screens[index];
        if(screen.name) obj.name = screen.name;
        if(screen.project) obj.name = screen.project;
        if(screen.description) obj.description = screen.description;
        if(screen.request) obj.request = screen.request;
        if(screen.response) obj.response = screen.response;

        return true;
    };

    public pop() : void {
        if(this.length > 0){
            this.screens.pop();
            this.length--;
        };
    };

    public clear() : void {
        this.screens = [];
        this.length = 0;
    };

};

export {
    Screen
};