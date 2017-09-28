import fetch from 'node-fetch';
import ArinData from './arin';

export default function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.ipaddr) {
        fetch(`http://whois.arin.net/rest/ip/${req.query.ipaddr}.json`)
            .then(res => res.json())
            .then(body => {
                context.log(body);
                context.res = {
                    body: new ArinData(body.net),
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