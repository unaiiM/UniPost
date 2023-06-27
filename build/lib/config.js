"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
;
class Config {
    constructor(cfg) {
        this.BASE_PATH = process.cwd();
        this.UILD_PATH = this.BASE_PATH + "/build";
        this.CONFIG_FILE = this.BASE_PATH + "/assets/json/config.json";
        Object.assign(this, cfg);
    }
    ;
    save() {
        fs.writeFileSync(JSON.stringify(this), this.CONFIG_FILE);
    }
    ;
    load() {
        const cfg = JSON.parse(fs.readFileSync(this.CONFIG_FILE).toString());
        Object.assign(this, cfg);
    }
    ;
}
exports.default = Config;
;
