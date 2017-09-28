"use strict";
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
    }
}
exports.ArinData = ArinData;
function bodyOf(prop) {
    if (prop) {
        return prop["$"];
    }
}
