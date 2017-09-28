"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const arin_1 = require("./arin");
function default_1(context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if (req.query.ipaddr) {
        node_fetch_1.default(`http://whois.arin.net/rest/ip/${req.query.ipaddr}.json`)
            .then(res => res.json())
            .then(body => {
            context.log(body);
            context.res = {
                body: new arin_1.default(body),
                isRaw: true,
            };
            context.done();
        });
    }
    else {
        context.res = {
            status: 400,
            body: `{
                "error_message": "IP address is required"
            }`,
            isRaw: true,
        };
        context.done();
    }
}
exports.default = default_1;
;
