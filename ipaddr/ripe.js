"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
function searchIP(addr) {
    return node_fetch_1.default(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => new RipeData(res.json()));
}
exports.searchIP = searchIP;
class RipeData {
    constructor(_) {
    }
}
exports.RipeData = RipeData;
