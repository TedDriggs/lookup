import fetch from 'node-fetch';
import * as arin from './arin';
import * as ripe from './ripe';

export default function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const ipaddr = req.query.ipaddr;

    if (ipaddr) {
        // Send searches out to all databases
        Promise.all([
            arin.searchIP(ipaddr), 
            ripe.searchIP(ipaddr, context)]
        ).then(items => {
            context.res = {
                body: {
                    arin: items[0],
                    ripe: items[1],
                },
                isRaw: true,
            };

            context.done();
        });
    } else {
        context.res = {
            status: 400,
            body: `{
                "error_message": "IP address is required"
            }`,
            isRaw: true,
        };

        context.done();
    }
};