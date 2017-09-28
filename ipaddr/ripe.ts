import fetch from 'node-fetch';

export function searchIP(addr: string, context?: any): Promise<RipeData> {
    return fetch(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => res.json())
        .then(data => {
            if (context) {
                context.log(data);
            }

            return new RipeData(data);
        });
}

export class RipeData {
    constructor(_: any) {

    }
}