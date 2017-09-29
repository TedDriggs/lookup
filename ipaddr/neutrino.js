"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
function searchIP(addr) {
    return node_fetch_1.default(`https://neutrinoapi.com/host-reputation?host=${addr}&output-format=json&output-case=camel&user-id=ehdv&api-key=rlGNlGpXScEvv6q2Y9sEIuzIXRZgkD3bkd5uY1aL1NbBB42k`)
        .then(res => res.json().then(data => ({ data, status: res.status })));
}
exports.searchIP = searchIP;
class Data {
    constructor(source) { }
}
exports.Data = Data;
