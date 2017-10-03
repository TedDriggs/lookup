"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const ipaddr = require('ipaddr.js');
var SearchMode;
(function (SearchMode) {
    SearchMode["Sample"] = "sample";
    SearchMode["Real"] = "real";
})(SearchMode = exports.SearchMode || (exports.SearchMode = {}));
const EXTRAHOP = ipaddr.parseCIDR("208.79.144.48/28");
function searchIP(addr, searchMode = SearchMode.Sample, context) {
    let served;
    if (searchMode === SearchMode.Real) {
        served = node_fetch_1.default(`https://neutrinoapi.com/host-reputation?host=${addr}&output-format=json&output-case=camel&user-id=ehdv&api-key=rlGNlGpXScEvv6q2Y9sEIuzIXRZgkD3bkd5uY1aL1NbBB42k`)
            .then(res => res.json());
    }
    else {
        const parsed = ipaddr.parse(addr);
        served = Promise.resolve(require('../neutrino-ipaddr-sample.json'));
        // XXX for the demo, the outside world is scary
        if (!parsed.match(EXTRAHOP)) {
            if (context)
                context.log(`${parsed.toString()} wasn't an ExtraHop address; amending risk score`);
            served = served.then(data => (Object.assign({}, data, { isListed: true, listCount: Math.floor(Math.random() * 162) })));
        }
        else {
            context.log(`${parsed.toString()} was an ExtraHop address; not altering risk`);
        }
    }
    return served.then(data => {
        return Object.assign({}, data, { 
            // XXX replace with a real threat score
            score: data.listCount / data.lists.length });
    });
}
exports.searchIP = searchIP;
