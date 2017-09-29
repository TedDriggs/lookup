import fetch from 'node-fetch';

export enum SearchMode {
    Sample = "sample",
    Real = "real",
}

export function searchIP(addr: string, searchMode: SearchMode = SearchMode.Sample): Promise<Data | null> {
    let served: Promise<Data>;
    
    if (searchMode === SearchMode.Real) {
        served = fetch(`https://neutrinoapi.com/host-reputation?host=${addr}&output-format=json&output-case=camel&user-id=ehdv&api-key=rlGNlGpXScEvv6q2Y9sEIuzIXRZgkD3bkd5uY1aL1NbBB42k`)
        .then(res => res.json())
    } else {
        const foo = require('../neutrino-ipaddr-sample.json');
        try {
            served = Promise.resolve(JSON.parse(foo));
        } catch (e) {
            throw new Error(foo);
        }
    }

    return served.then((data: Data) => {
        return {
            ...data,
            // XXX replace with a real threat score
            score: data.lists.filter(l => l.isListed).length / data.lists.length
        }
    });
}

export interface Data {
    isListed: boolean;
    lists: ThreatListReport[];
    score: number;
}

export interface ThreatListReport {
    isListed: boolean;
    listHost: string;
    listName: string;
    txtRecord?: string;
}