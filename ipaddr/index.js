"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arin = require("./arin");
const ripe = require("./ripe");
function default_1(context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    if (req.query.ipaddr) {
        Promise.all([arin.searchIP(req.query.ipaddr), ripe.searchIP(req.query.ipaddr)]).then(items => {
            context.res = {
                body: {
                    arin: items[0],
                    ripe: items[1],
                },
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
