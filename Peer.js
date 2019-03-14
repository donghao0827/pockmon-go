const p2p = require('p2p');
const peer = p2p.peer({
    host: 'localhost',
    port: 3000,
    metadata: {
        foo: 'bar'
    },
    wellKnownPeers: [{ host: 'localhost', port: 4000 }]
});

