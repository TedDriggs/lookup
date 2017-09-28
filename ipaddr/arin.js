"use strict";
// See `arin-ipaddr-sample.json` for an example of the input data for this
// module.
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
function searchIP(addr) {
    return node_fetch_1.default(`http://whois.arin.net/rest/ip/${addr}.json`)
        .then(res => res.json())
        .then(data => new Data(data.net));
}
exports.searchIP = searchIP;
/**
 * Cleaned data returned by ARIN
 */
class Data {
    constructor(source) {
        this.registrationDate = Date.parse(bodyOf(source["registrationDate"]));
        this.ref = bodyOf(source["ref"]);
        this.handle = bodyOf(source["handle"]);
        this.name = bodyOf(source["name"]);
        this.org = new Org(source.orgRef);
        this.updateDate = Date.parse(bodyOf(source["updateDate"]));
    }
}
exports.Data = Data;
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
