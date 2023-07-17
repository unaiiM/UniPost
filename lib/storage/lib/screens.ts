import { Screen } from "@shared/types/storage";

interface ScreensNames {}

export default class Screens {
    
    private screens : Screen[] = [];
    public length : number = 0;
    
    constructor(screens : Screen[] = []){
        this.screens = this.screens.concat(screens);
    };

    public exists(index : number) : boolean {
        return index >= 0 && index < this.length;
    };

    public all() : Screen[] {
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

    public add(screen : Screen) : void {
        this.screens.push(screen);
        this.length++;
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

    public modify(index : number, screen : Screen) : boolean {
        if(!this.exists(index)) return false;
        this.screens[index] = screen;
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