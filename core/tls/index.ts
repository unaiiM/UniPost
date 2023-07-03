import * as tls from "tls";

export interface TlsOptions {
    disable : boolean;
};

export default class Tls {

    public constructor(
        private options : TlsOptions;
    ){};

};