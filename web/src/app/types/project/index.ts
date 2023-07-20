export interface ProjectInfo {
    name : string,
    description : string;
};

export interface Project {
    name : string,
    description : string;
    form : ProjectInfo;
    show : boolean;
    disabled : boolean;
};

export interface ProjectsScreensServiceInfo {
    name : string;
};

export type Projects = Project[];