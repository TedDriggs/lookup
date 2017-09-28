import fetch from 'node-fetch';
import * as arin from './arin';
import * as ripe from './ripe';

export default function (context, req) {
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