import express from "express";
import { storage, Screen, Screens } from "@lib/storage";
import utils from "../lib/utils";
import { Project, ProjectInfo } from "@lib/storage/lib/projects";

const router : express.Router = express.Router();
const checkProjectNotExists : ((req : express.Request, res : express.Response, next : express.NextFunction) => void)[] = [checkProject, __checkProjectNotExists];
const checkProjectExists : ((req : express.Request, res : express.Response, next : express.NextFunction) => void)[] = [checkProject, __checkProjectExists];
const checkProjectScreenExists : ((req : express.Request, res : express.Response, next : express.NextFunction) => void)[] = [checkProject, __checkProjectExists, __checkProjectScreenExists];

router.route("/")
    .get((req : express.Request, res : express.Response) => {
        res.json(storage.projects.names());
    })
    .post(checkProjectNotExists, (req : express.Request, res : express.Response) => {
        const action : string = req.body.action;

        if(action === 'create'){
            storage.projects.add();

            res.json({
                message: "Project created sucessfully!"
            });
        }else {
            res.json({
                error: "Action not found!"
            }); 
        };
    });

router.route("/:project")
    .all(checkProjectExists)
    .get((req : express.Request,  res : express.Response) => {
        const project : number = Number(req.params.project);
        
        const screens : Screens = storage.projects.getScreens(project);
        res.json(screens.getAllInfo());
    })
    .post((req : express.Request, res : express.Response) => {
        const action : string = req.body.action;
        const project : number = Number(req.params.project);

        if(action === 'modify'){
            const info : Partial<ProjectInfo> = getProjectFromRequest(req);
            storage.projects.modify(project, info);
           
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
    });

router.route("/:project/:index")
    .get(checkProjectScreenExists, (req : express.Request, res : express.Response) => {
        const project : number = Number(req.params.project);
        const screens : Screens = storage.projects.getScreens(project);
        const index : number = Number(req.params.index);  
        const screen : Screen = screens.get(index);
        res.json(screen);
    })
    .post((req : express.Request, res : express.Response) => {
        const project : number = Number(req.params.project);
        const index : number = Number(req.params.index);
        const screens : Screens = storage.projects.getScreens(project);
        utils.screens.handleScreensAction(req, res, screens, index);
    });

function getProjectFromRequest(req : express.Request) : Partial<ProjectInfo> | undefined {
    if(req.body.screen) return <Partial<ProjectInfo>> req.body.screen;
    else return undefined;
};

function checkProject(req : express.Request, res : express.Response, next : express.NextFunction){
    const project : string = req.params.project;

    if(!project) 
        res.json({
            error: "Project undefined!"
        })
    else next();
};

function __checkProjectNotExists(req : express.Request, res : express.Response, next : express.NextFunction){
    const project : number = Number(req.params.project);

    if(storage.projects.exists(project)) 
        res.json({
            error: "Project alredy exists!"
        })
    else next();
};

function __checkProjectExists(req : express.Request, res : express.Response, next : express.NextFunction){
    const project : number = Number(req.params.project);

    if(!storage.projects.exists(project)) 
        res.json({
            error: "Project doesn't exist!"
        })
    else next();
};

function __checkProjectScreenExists(req : express.Request, res : express.Response, next : express.NextFunction){
    const project : number = Number(req.params.project);
    const screens : Screens = storage.projects.getScreens(project);
    const index : number = Number(req.params.index);
        
    if(screens.exists(index)){
        next();
    }else res.json({
        error: "Screen not found!"
    });
};

export default router;

