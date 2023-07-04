

export default {
    
    /**
     * Pairs in the list are separated by a semicolon and a space ('; ').
     */
    parseSemiclon(value : string) : Record<string, string> {
        let obj : Record<string, string> = {};

        for(const pair of value.split("; ")){
            const splited : string[] = pair.split("=");
            const key : string = splited[0];
            const value : string = splited.slice(1).join("=");

            obj[key] = value;
        };

        return obj;
    }

};