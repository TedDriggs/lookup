import fetch from 'node-fetch';
import * as arin from './arin';
import * as ripe from './ripe';
import * as neutrino from './neutrino';

export default function (context, req) {
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
    } else {
        search(ipaddr, Boolean(threat)).then(body => {
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

/**
 * Perform a search for an IP address.
 * 
 * @param addr The address to search for
 * @param includeThreat Whether or not to search for threat information
 */
function search(addr: string, includeThreat: boolean = false): Promise<Rsp> {
    const who = arin.searchIP(addr);
    const threat = includeThreat ? neutrino.searchIP(addr) : Promise.resolve(undefined);

    return Promise.all([who, threat]).then((items: [arin.Data | null, neutrino.Data | null]) => ({
        whois: items[0],
        threat: items[1],
    }));
}

interface Rsp {
    whois: arin.Data | null;
    threat?: neutrino.Data | null;
}