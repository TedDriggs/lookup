/** ARIN representation of XML elements */
export type ArinValue<T> = { "$": T };

/**
 * Cleaned data returned by ARIN
 */
export default class ArinData {
    registrationDate?: string;
    ref?: string;
    handle?: string;
    name?: string;
    originASes?: { originAS: string };

    constructor(source: any) {
        this.registrationDate = bodyOf(source["registrationDate"]) as string;
        this.ref = bodyOf(source["ref"]) as string;
        this.handle = bodyOf(source["handle"]) as string;
        this.name = bodyOf(source["name"]) as string;
    }
}

function bodyOf<T>(prop?: ArinValue<T>): T | undefined {
    if (prop) {
        return prop["$"];
    }
}