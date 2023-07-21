import * as express from "express";
import { Screen, Screens } from "@lib/storage";

export function getScreenFromRequest(req : express.Request) : Partial<Screen> | undefined {
    // What will happend if just add only --> return <Partial<Screen>> req.body.screen;
    // error while casting undefined to partial interface.
    if(req.body.screen) return <Partial<Screen>> req.body.screen;
    else return undefined;
};

export function addScreenRouter(router : express.Router, screens : Screens) : void {
    router.route("/")
        .get((req : express.Request, res : express.Response) => {   
            console.log(screens.getAllInfo());          
            res.json(screens.getAllInfo());
        })
        .post((req : express.Request, res : express.Response) => {
            handleScreensAction(req, res, screens);
        });

    router.route("/:index")
        .get((req : express.Request, res : express.Response) => {
            const index : number = Number(req.params.index);
                
            if(screens.exists(index)){
                const screen : Screen = screens.get(index);
                
                res.json(screen);
            }else res.json({
                error: "Screen not found!"
            });
        })
        .post((req : express.Request, res : express.Response) => {
            const index : number = Number(req.params.index);
            handleScreensAction(req, res, screens,index);
        });
};

export function handleScreensAction(req : express.Request, res : express.Response, 
    screens : Screens, index? : number) : void {

    const action : string = req.body.action;
    console.log("[API] Screens action " + action + " on " + ((index === undefined) ? "all screens" : index + " screen"));
    if(index === undefined){

            if(action === 'pop'){
                screens.pop();

                res.json({
                    message: "Last screen deleted sucessfully!"
                });
            }else if(action === 'clear'){
                screens.clear();
                screens.add();

                res.json({
                    message: "All screens has been deleted sucessfully!"
                });
            }else if(action === 'add'){
                const screen : Partial<Screen> | undefined = getScreenFromRequest(req); 
                screens.add(screen);

                res.json({
                    message: "Screen added sucessfully!"
                });
            }else res.json({
                error: "Action not found!"
            });

    }else {
        
        if(screens.exists(index)){

            if(action === 'delete'){
                screens.delete(index);

                res.json({
                    message: "Screen deleted sucessfully!"
                });
            }else if(action === 'modify'){
                const screen : Partial<Screen> = getScreenFromRequest(req);
                screens.modify(index, screen);
                
                res.json({
                    message: "Screen modified sucessfully!"
                });
            }else res.json({
                error: "Action not found!"
            });

        } else res.json({
            error: "Screen not found!"
        });

    };

};