import * as express from "express";
import Storage, { Screen, Projects } from "@lib/storage";

const storage : Storage = new Storage();
const router : express.Router = express.Router();

router.use(express.urlencoded());

router.route("/")
    .get((req : express.Request, res : express.Response) => {
        res.json(storage.getProjects());
    });

router.route("/:project")
    .get((req : express.Request, res : express.Response) => {
        const project : string = req.params.project;
        
        if(project && storage.existsProject(project)){
            res.json(storage.getProject(project));
        }else {
            res.json({
                error: "Project not found!"
            });
        };
    })
    .post((req : express.Request, res : express.Response) => {
        const action : string = req.body.action;
        const project : string = req.params.project;
        
        if(!storage.existsProject(project)) res.json({
            error: "Project alredy exists!"
        })
        else {

            if(action === 'create'){
                storage.createProject(project);

                res.json({
                    message: "Project created sucessfully!"
                });
            }else if(action === 'modify'){
                const name : string = req.body.name;

                storage.modifyProject(project, name);
            }else if(action === 'add'){
                const screen : Screen = loadScreenFromRequest(req);

                storage.addProjectScreen(project, screen);
            };
        
        };
    });

router.route("/:project/:index")
    .post((req : express.Request, res : express.Response) => {
        const project : string = req.params.project;
        const index : number = Number(req.params.index);
        const screen : Screen = loadScreenFromRequest(req);

        if(project && storage.existsProject(project)){
            storage.modifyProjectScreen(project, index, screen);

            res.json({
                message: "Project screen updated!"
            });
        }else {
            res.json({
                error: "Project not found!"
            });
        }; 
    });

export default router;

function loadScreenFromRequest(req : express.Request) : Screen {
    const screen : Screen = {
        name: req.body.name,
        request: req.body.request,
        response: req.body.response
    };

    return screen;
};