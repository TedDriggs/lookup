"use strict";
// See `arin-ipaddr-sample.json` for an example of the input data for this
// module.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Cleaned data returned by ARIN
 */
class ArinData {
    constructor(source) {
        this.registrationDate = bodyOf(source["registrationDate"]);
        this.ref = bodyOf(source["ref"]);
        this.handle = bodyOf(source["handle"]);
        this.name = bodyOf(source["name"]);
        this.org = new Org(source.orgRef);
    }
}
exports.default = ArinData;
class Org {
    constructor(source) {
        this.name = source["@name"];
        this.handle = source["@handle"];
        this.ref = bodyOf(source);
    }
    /** The URL to retrieve information about this resource as JSON via REST. */
    get restUrl() {
        return `${this.ref}.json`;
    }
}
exports.Org = Org;
function bodyOf(prop) {
    if (prop) {
        return prop["$"];
    }
}
