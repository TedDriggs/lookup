/** ARIN representation of XML elements */
export type ArinValue<T> = { "$": T };

/**
 * Cleaned data returned by ARIN
 */
export class ArinData {
    registrationDate?: string;
    ref?: string;
    handle?: string;
    name?: string;
    originASes?: { originAS: string };

    constructor(source: any) {
        this.registrationDate = bodyOf(source["registrationDate"]);
        this.ref = bodyOf(source["ref"]);
        this.handle = bodyOf(source["handle"]);
        this.name = bodyOf(source["name"]);
    }
}

function bodyOf<T>(prop?: ArinValue<T>): T | undefined {
    if (prop) {
        return prop["$"];
    }
}