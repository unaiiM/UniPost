import * as tls from "tls";
import * as net from "net";

export type TlsVersions = "TLSv1.3" | 
    "TLSv1.2" | 
    "TLSv1.1" | 
    "TLSv1";

type ContentFile = string | string[] | Buffer | Buffer[];
interface Options {
    maxVersion : TlsVersions;
    minVersion : TlsVersions;
    ciphers : string;
    ca : ContentFile;
    cert : ContentFile;
    key : ContentFile;
};

export type TlsClientOptions = Partial<Options>;

export default class Tls {

    public constructor(
        private socket : net.Socket,
        private options : TlsClientOptions = {}
    ){};

    public join(callback? : () => void) : void {
        const secureContextOptions : tls.SecureContextOptions = this.options;
        tls.connect({ 
            socket : this.socket,
            secureContext : tls.createSecureContext(secureContextOptions)
        }, callback);
    };

};