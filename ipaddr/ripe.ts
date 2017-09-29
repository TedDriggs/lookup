import fetch from 'node-fetch';

export function searchIP(addr: string, context?: any): Promise<RipeData> {
    return fetch(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => res.json().then(data => ({ data, status: res.status})))
        .then(({ data, status }) => {
            if (context) {
                context.log(`RIPE returned ${status}`);
                context.log(data);
            }

            return new RipeData(data, context);
        });
}

export class RipeData {
    constructor(source: any, context?: any) {
        if (source.errormessages.errormessage && context) {
            context.log(source.errormessages.errormessage);
        }
    }
}