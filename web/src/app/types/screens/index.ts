import { ProjectInfo, ProjectsScreensServiceInfo } from "../project";

export interface ScreenInfo {
    name : string;
    description : string;
    project : string;
};

export interface Screen {
    name : string;
    description : string;
    project : string;
    form : ScreenInfo;
    show : boolean;
    disabled : boolean;
};

export type ScreensServiceInfo = undefined |
    ProjectsScreensServiceInfo;
export type Screens = Screen[];
export type ScreensInfo = ScreenInfo[];
export type ScreensUnion = ScreenInfo[] | 
    ProjectInfo[];

export interface APIMessage {
    message : string;
};

export interface APIError {
    error : string;
};