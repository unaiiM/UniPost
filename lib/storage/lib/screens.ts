export interface Screen {
    name : string,
    request : string;
    response : string;
};

export default class Screens {
    
    private screens : Screen[] = [];
    public length : number = 0;
    
    constructor(screens : Screen[] = []){
        this.screens = this.screens.concat(screens);
    };

    public exists(index : number) : boolean {
        return index >= 0 && index < this.length;
    };

    public get(index : number) : Screen {
        return this.screens[index];
    };

    public add(screen : Screen) : void {
        this.screens.push(screen);
        this.length++;
    };

    public delete(index : number) : boolean {
        if(!this.exists(index)) return false;
        this.screens.splice(index, 1);
        this.length--;
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