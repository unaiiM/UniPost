import express from "express";
import { storage, Screen, Screens } from "@lib/storage";
import utils from "../lib/utils";

const router : express.Router = express.Router();

router.route("/")
    .get((req : express.Request, res : express.Response) => {
        res.json(storage.projects.names());
    })
    .post((req : express.Request, res : express.Response) => {
        const action : string = req.body.action;
        const project : string = req.body.project;
        
        if(project && !storage.projects.exists(project)){

            if(action === 'create'){
                storage.projects.create(project);

                res.json({
                    message: "Project created sucessfully!"
                });
            }else {
                res.json({
                    error: "Action not found!"
                }); 
            };
        
        } else res.json({
            error: "Project alredy exists!"
        });
    });

router.route("/:project")
    .get((req : express.Request,  res : express.Response) => {
        const project : string = req.params.project;
        
        if(project && storage.projects.exists(project)){
            const screens : Screens = storage.projects.get(project);
            res.json(screens.getAllInfo());
        }else {
            res.json({
                error: "Project not found!"
            });
        };
    })
    .post((req : express.Request, res : express.Response) => {
        const action : string = req.body.action;
        const project : string = req.params.project;
        
        if(project && storage.projects.exists(project)){

            if(action === 'modify'){
                const name : string = req.body.name;
                storage.projects.modify(project, name);
                
                res.json({
                    message: "Project modified sucessfully!"
                });
            }else if(action === 'delete'){
                storage.projects.delete(project);

                res.json({
                    message: "Project deleted sucessfully!"
                });
            }else {
                res.json({
                    error: "Action not found!"
                }); 
            };
        
        } else res.json({
            error: "Project is undefined or alredy exists!"
        });

    });

router.route("/:project/:id")
    .get((req : express.Request, res : express.Response) => {
        const project : string = req.params.project;

        if(project && storage.projects.exists(project)){
            const screens : Screens = storage.projects.get(project);
            
            res.json(screens);
        }else {
            res.json({
                error: "Project not found!"
            });
        }; 
    })
    .post((req : express.Request, res : express.Response) => {
        const project : string = req.params.project;

        if(project && storage.projects.exists(project)){
            const screens : Screens = storage.projects.get(project);
            utils.screens.handleScreensAction(req, res, screens);
        }else {
            res.json({
                error: "Project not found!"
            });
        }; 
    });

router.route("/:project/:index")
    .get((req : express.Request, res : express.Response) => {
        const project : string = req.params.project;

        if(project && storage.projects.exists(project)){
            const screens : Screens = storage.projects.get(project);
            const index : number = Number(req.params.index);
                
            if(screens.exists(index)){
                const screen : Screen = screens.get(index);
                
                res.json(screen);
            }else res.json({
                error: "Screen not found!"
            });

        }else {
            res.json({
                error: "Project not found!"
            });
        }; 
    })
    .post((req : express.Request, res : express.Response) => {
            const project : string = req.params.project;
            const index : number = Number(req.params.index);

            if(project && storage.projects.exists(project)){
                const screens : Screens = storage.projects.get(project);
                utils.screens.handleScreensAction(req, res, screens, index);
            }else {
                res.json({
                    error: "Project not found!"
                });
            }; 
    });


function checkProjectExists(req : express.Request, res : express.Response, next : express.NextFunction){
    const project : string = req.params.project;

    if(!project || !storage.projects.exists(project)) 
        res.json({
            error: "Project doesn't exist"
        })
    else next();
};

function checkProjectScreen(req : express.Request, res : express.Response, next : express.NextFunction){
    const project : string = req.params.project;
    const index : number = req.params.index;
};

export default router;

