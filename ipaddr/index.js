"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipaddr = require('ipaddr.js');
const arin = require("./arin");
const neutrino = require("./neutrino");
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
        search(ipaddr, threat, context).then(body => {
            context.res = {
                body,
                isRaw: true,
            };
            context.done();
        }).catch(reason => {
            context.res = {
                statusCode: 500,
                body: {
                    error_message: "Something went wrong",
                    reason,
                },
                isRaw: true,
            };
            context.done();
        });
    }
}
exports.default = default_1;
/**
 * Perform a search for an IP address.
 *
 * @param ipaddr The address to search for
 * @param threatMode Whether or not to really search for threat information
 */
function search(ipaddr, threatMode, context) {
    const who = arin.searchIP(ipaddr);
    const threat = neutrino.searchIP(ipaddr, threatMode, context);
    return Promise.all([who, threat]).then((items) => ({
        ipaddr,
        whois: items[0],
        threat: items[1],
    }));
}
