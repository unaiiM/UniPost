export interface Screen {
    name : string,
    request : string;
    response : string;
};

export default class Screens {
    
    private screens : Screen[] = [];
    
    constructor(screens : Screen[] = []){
        this.screens = this.screens.concat(screens);
    };

    public get(index : number) : Screen {
        return this.screens[index];
    };

    public add(screen : Screen) : void {
        this.screens.push(screen);
    };

    public delete(index : number) : void {
        this.screens.splice(index, 1);
    };

    public pop() : void {
        this.screens.pop();
    };

};