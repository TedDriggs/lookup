import fetch from 'node-fetch';

export function searchIP(addr: string): Promise<RipeData> {
    return fetch(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => new RipeData(res.json()));
}

export class RipeData {
    constructor(_: any) {

    }
}