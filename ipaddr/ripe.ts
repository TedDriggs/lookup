import fetch from 'node-fetch';

export function searchIP(addr: string, context?: any): Promise<Data | null> {
    return fetch(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => res.json().then(data => ({ data, status: res.status})))
        .then(({ data, status }: { data: RipeResponse, status: number }) => {
            if (status === 404) {
                return null;
            }
            
            if (context) {
                context.log(`RIPE returned ${status}`);
                context.log(data);
            }

            return new Data(data, context);
        });
}

export class Data {
    constructor(source: RipeResponse, context?: any) {
        if (source.errormessages && source.errormessages.errormessage && context) {
            context.log(source.errormessages.errormessage);
        }
    }
}

interface RipeResponse {
    errormessages?: {
        errormessage: ErrorMessage[]
    }
}

interface ErrorMessage {
    severity: "Error" | "Warning";
    text: string;
    args: { [k: string]: any; };
}