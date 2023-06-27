"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
;
class Connector {
    constructor(struct) {
        this.ASSETS_PATH = "/assets";
        this.CORE_PATH = "/core";
        this.API_PATH = "/api";
        this.LIB_PATH = "/lib";
        this.config = new config_1.default();
        this.config.load();
        Object.assign(this, struct);
    }
    ;
    joinBase(struct) {
        for (const key in struct) {
            struct[key] = config.BASE_PATH + struct[key];
        }
        ;
    }
    ;
}
exports.default = Connector;
;
