import fetch from 'node-fetch';

export function searchIP(addr: string): Promise<Data | null> {
    return fetch(`https://neutrinoapi.com/host-reputation?host=${addr}&output-format=json&output-case=camel&user-id=ehdv&api-key=rlGNlGpXScEvv6q2Y9sEIuzIXRZgkD3bkd5uY1aL1NbBB42k`)
        .then(res => res.json().then(data => ({ data, status: res.status })));
}

export class Data {
    constructor(source: any) {}
}