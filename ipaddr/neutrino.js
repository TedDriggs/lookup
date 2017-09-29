"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
var SearchMode;
(function (SearchMode) {
    SearchMode["Sample"] = "sample";
    SearchMode["Real"] = "real";
})(SearchMode = exports.SearchMode || (exports.SearchMode = {}));
function searchIP(addr, searchMode = SearchMode.Sample) {
    let served;
    if (searchMode === SearchMode.Real) {
        served = node_fetch_1.default(`https://neutrinoapi.com/host-reputation?host=${addr}&output-format=json&output-case=camel&user-id=ehdv&api-key=rlGNlGpXScEvv6q2Y9sEIuzIXRZgkD3bkd5uY1aL1NbBB42k`)
            .then(res => res.json());
    }
    else {
        const foo = require('../neutrino-ipaddr-sample.json');
        try {
            served = Promise.resolve(JSON.parse(foo));
        }
        catch (e) {
            throw new Error(foo);
        }
    }
    return served.then((data) => {
        return Object.assign({}, data, { 
            // XXX replace with a real threat score
            score: data.lists.filter(l => l.isListed).length / data.lists.length });
    });
}
exports.searchIP = searchIP;
