import * as express from "express";
import { Screen, Screens } from "@lib/storage";

export function ScreensHandler(req : express.Request, res : express.Response, 
    screens : Screens, index? : number) : void {

    const action : string = req.body.action;

    if(index === undefined){

            if(action === 'pop'){
                screens.pop();

                res.json({
                    message: "Last screen deleted sucessfully!"
                });
            }else if(action === 'clear'){
                screens.clear();

                res.json({
                    message: "All screens has been deleted sucessfully!"
                });
            }else if(action === 'add'){
                const screen : Screen = getScreenFromRequest(req); 
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
                const screen : Screen = getScreenFromRequest(req);
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

export function getScreenFromRequest(req : express.Request) : Screen {
    const screen : Screen = {
        name: req.body.name,
        request: req.body.request,
        response: req.body.response
    };

    return screen;
};

export function ScreensRouter(router : express.Router, screens : Screens){
    router.route("/")
        .get((req : express.Request, res : express.Response) => {             
            res.json(screens.names());
        })
        .post((req : express.Request, res : express.Response) => {
            ScreensHandler(req, res, screens);
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
            ScreensHandler(req, res, screens,index);
        });
};