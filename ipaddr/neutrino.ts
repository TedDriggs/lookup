import fetch from 'node-fetch';
const ipaddr = require('ipaddr.js');

export enum SearchMode {
    Sample = "sample",
    Real = "real",
}

const EXTRAHOP = ipaddr.parseCIDR("208.79.144.48/28");

export function searchIP(addr: string, searchMode: SearchMode = SearchMode.Sample, context?: any): Promise<Data | null> {
    let served: Promise<Data>;
    
    if (searchMode === SearchMode.Real) {
        served = fetch(`https://neutrinoapi.com/host-reputation?host=${addr}&output-format=json&output-case=camel&user-id=ehdv&api-key=rlGNlGpXScEvv6q2Y9sEIuzIXRZgkD3bkd5uY1aL1NbBB42k`)
        .then(res => res.json())
    } else {
        const parsed = ipaddr.parse(addr);

        served = Promise.resolve(require('../neutrino-ipaddr-sample.json'));

        // XXX for the demo, the outside world is scary
        if (!parsed.match(EXTRAHOP)) {
            if (context) context.log(`${parsed.toString()} wasn't an ExtraHop address; amending risk score`);

            served = served.then(data => {
                data.isListed = true;
                data.listCount = Math.floor(Math.random() * 162);
                return data;
            });
        } else {
            context.log(`${parsed.toString()} was an ExtraHop address; not altering risk`)
        }
    }

    return served.then(data => {
        return {
            ...data,
            // XXX replace with a real threat score
            score: data.listCount / data.lists.length
        }
    });
}

export interface Data {
    isListed: boolean;
    listCount: number;
    lists: ThreatListReport[];
    score: number;
}

export interface ThreatListReport {
    isListed: boolean;
    listHost: string;
    listName: string;
    txtRecord?: string;
}