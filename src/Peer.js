const p2p = require('p2p');
const utils = require("../public/Utils");

class Peer {
    constructor(host, port, MCL) {
        this.host = host;
        this.port = port;
        this.MCL = MCL;
        this.peer;
    }
    joinNetwork(peerGroup) {
        this.peer =  p2p.peer({
            host: this.host,
            port: this.port,
            wellKnownPeers: peerGroup
        })
    }
    send(peerGroup, massage) {
        peerGroup.map((partner) => {
            this.peer.remote(partner).run('handle/recv', massage, (err, result) => {
                console.log(err, result)
            })
        })
    }

    recv() {
        this.peer.handle.recv = (payload, done) => {
            console.log(`${this.port} get the data: ${payload}`); 
            console.log('verify Hash ...');
            if(this.verifySignature(payload)) {
                console.log('Hash is right.');
            } else {
                console.log('Hash is wrong!');
            } 
            console.log('verify identity ...');
            if(this.verifyIdentity(payload.sponsor, this.MCL) === -1) {
                console.log('Identity is wrong!');
            } else {
                console.log('Identity is right.');
            } 
        }
    }

    verifySignature(beVerified) {
        const hashRecv = beVerified.signature;
        const hashCalulate = utils.calculateHash(beVerified.version + beVerified.uuid + beVerified.sponsor + beVerified.type + JSON.stringify(beVerified.domainInfo) + beVerified.timestamp)
        return hashCalulate === hashRecv;
    }

    verifyIdentity(sponsor, MCL) {
        console.log(sponsor, MCL, MCL.indexOf(sponsor));
        return MCL.indexOf(sponsor);
    }
}

module.exports = Peer;
// const peer1 = p2p.peer({
//     host: 'localhost',
//     port: 3000,
//     metadata: {
//         foo: 'bar'
//     },
//     wellKnownPeers: [{ host: 'localhost', port: 4000 }]
// });

// peer1.handle.foo = (payload, done) => {
//     // Do something with payload...
//     // if (err) {
//     //     return done(err);
//     // }
//     console.log("peer1 get the data", payload);
// }

// const peer2 = p2p.peer({
//     host: 'localhost',
//     port: 4000,
//     metadata: {
//         foo: 'coffee'
//     },
//     wellKnownPeers: [{ host: 'localhost', port: 3000 }]
// });

// peer2.remote({
//     host: 'localhost',
//     port: 3000
// }).run('handle/foo', { msg: package }, (err, result) => {
//     console.log(err, result)
// })

