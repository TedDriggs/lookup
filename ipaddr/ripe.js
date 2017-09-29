"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
function searchIP(addr, context) {
    return node_fetch_1.default(`http://rest.db.ripe.net/ripe/inetnum/${addr}.json`)
        .then(res => res.json().then(data => ({ data, status: res.status })))
        .then(({ data, status }) => {
        if (status === 404) {
            return null;
        }
        if (context) {
            context.log(`RIPE returned ${status}`);
            context.log(data);
        }
        return new Data(data, context);
    });
}
exports.searchIP = searchIP;
class Data {
    constructor(source, context) {
        if (source.errormessages && source.errormessages.errormessage && context) {
            context.log(source.errormessages.errormessage);
        }
    }
}
exports.Data = Data;
