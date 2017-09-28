"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
function searchIP(addr, context) {
    return node_fetch_1.default(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => res.json())
        .then(data => {
        if (context) {
            context.log(data);
        }
        return new RipeData(data);
    });
}
exports.searchIP = searchIP;
class RipeData {
    constructor(_) {
    }
}
exports.RipeData = RipeData;
