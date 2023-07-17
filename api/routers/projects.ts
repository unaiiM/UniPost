import express from "express";
import { storage, Screen, Screens } from "@lib/storage";
import { ScreensHandler } from "../lib/globalScreensUtils";

const router : express.Router = express.Router();

router.use(express.urlencoded());

router.route("/")
    .get((req : express.Request, res : express.Response) => {
        res.json(storage.projects.names());
    })
    .post((req : express.Request, res : express.Response) => {
        const action : string = req.body.action;
        const project : string = req.params.project;
        
        if(project && storage.projects.exists(project)){

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
    .get((req : express.Request, res : express.Response) => {
        const project : string = req.params.project;
        
        if(project && storage.projects.exists(project)){
            res.json(storage.projects.get(project));
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
            error: "Project alredy exists!"
        });

    });

router.route("/:project/screens")
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
            ScreensHandler(req, res, screens);
        }else {
            res.json({
                error: "Project not found!"
            });
        }; 
    });

router.route("/:project/screens/:index")
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
                ScreensHandler(req, res, screens, index);
            }else {
                res.json({
                    error: "Project not found!"
                });
            }; 
    });

export default router;

