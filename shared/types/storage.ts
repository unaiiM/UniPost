export interface ScreenInfo {
    name : string,
    project : string;
    description : string; 
};

export interface ScreenStruct {
    request : string;
    response : string;
}

export interface Screen extends ScreenInfo, ScreenStruct {};
