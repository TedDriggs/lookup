// See `arin-ipaddr-sample.json` for an example of the input data for this
// module.

import fetch from 'node-fetch';

/** ARIN representation of XML elements */
export type ArinValue<T> = { "$": T };

export function searchIP(addr: string): Promise<Data> {
    return fetch(`http://whois.arin.net/rest/ip/${addr}.json`)
        .then(res => res.json())
        .then(data => new Data(data.net));
}

/**
 * Cleaned data returned by ARIN
 */
export class Data {
    registrationDate?: number;
    ref?: string;
    handle?: string;
    name?: string;
    org?: Org;
    originASes?: { originAS: string };
    updateDate?: number;

    constructor(source: any) {
        this.registrationDate = Date.parse(bodyOf(source["registrationDate"]) as string);
        this.ref = bodyOf(source["ref"]) as string;
        this.handle = bodyOf(source["handle"]) as string;
        this.name = bodyOf(source["name"]) as string;
        this.org = new Org(source.orgRef);
        this.updateDate = Date.parse(bodyOf(source["updateDate"]) as string);
    }
}

export class Org {
    name: string;
    handle: string;
    ref: string;

    constructor(source: any) {
        this.name = source["@name"];
        this.handle = source["@handle"];
        this.ref = bodyOf(source) as string;
    }

    /** The URL to retrieve information about this resource as JSON via REST. */
    get restUrl(): string {
        return `${this.ref}.json`;
    }
}

function bodyOf<T>(prop?: ArinValue<T>): T | undefined {
    if (prop) {
        return prop["$"];
    }
}