"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arin = require("./arin");
const ripe = require("./ripe");
function default_1(context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const { ipaddr, threat } = req.query;
    if (!ipaddr) {
        context.res = {
            status: 400,
            body: `{
                "error_message": "IP address is required"
            }`,
            isRaw: true,
        };
        context.done();
    }
    else {
    }
    if (ipaddr) {
        // Send searches out to all databases
        Promise.all([
            arin.searchIP(ipaddr),
            ripe.searchIP(ipaddr, context)
        ]).then(items => {
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
    }
}
exports.default = default_1;
;
