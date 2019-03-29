var Peer = require('./src/Peer');
const massage = require('./src/message/Message');

//const msg = new massage(1, "2019314", "China", 1, {"domain": "www.qq.com"}, "20193143132");
// const MCl = [
//     { name : "China", code : 100001 },
//     { name : "France", code : 100002 },
//     { name : "UK", code : 100003 },
//     { name : "USA", code : 100004 },
//     { name : "Russia", code: 100005 }
// ]
const MCL =['China', 'France', 'UK', 'USA', 'Russia'];

var peer1 = new Peer("localhost", 3000, MCL, "China");
var peer2 = new Peer("localhost", 4000, MCL, "France");
var peer3 = new Peer("localhost", 5000, MCL, "UK");
var peer4 = new Peer("localhost", 6000, MCL, "USA");
var peer5 = new Peer("localhost", 7000, MCL, "Russia");


peer1.joinNetwork([
    { host: 'localhost', port: 4000 },
    { host: 'localhost', port: 5000 },
    { host: 'localhost', port: 6000 },
    { host: 'localhost', port: 7000 }
]);
peer2.joinNetwork([
    { host: 'localhost', port: 3000 },
    { host: 'localhost', port: 5000 },
    { host: 'localhost', port: 6000 },
    { host: 'localhost', port: 7000 }
]);
peer3.joinNetwork([
    { host: 'localhost', port: 3000 },
    { host: 'localhost', port: 4000 },
    { host: 'localhost', port: 6000 },
    { host: 'localhost', port: 7000 }
]);
peer4.joinNetwork([
    { host: 'localhost', port: 3000 },
    { host: 'localhost', port: 4000 },
    { host: 'localhost', port: 5000 },
    { host: 'localhost', port: 7000 }
]);
peer5.joinNetwork([
    { host: 'localhost', port: 3000 },
    { host: 'localhost', port: 4000 },
    { host: 'localhost', port: 5000 },
    { host: 'localhost', port: 6000 }
])

peer1.recv();
peer2.recv();
peer3.recv();
peer4.recv();
peer5.recv();

//var flag = true;
(function schedule() {
    setTimeout(do_it, 5000, schedule);
}());
function do_it(callback) {
    const msg = new massage(1, "2019314", "China", 1, {"domain": "www.qq.com"}, Date.now());
    const package = msg.buildMessage();
    peer1.send([
        { host: 'localhost', port: 4000 },
        { host: 'localhost', port: 5000 },
        { host: 'localhost', port: 6000 },
        { host: 'localhost', port: 7000 }
    ], package);
    callback();
};

// var send = function(){
//     peer1.send([
//         { host: 'localhost', port: 4000 },
//         { host: 'localhost', port: 5000 },
//         { host: 'localhost', port: 6000 },
//         { host: 'localhost', port: 7000 }
//     ], package);
// }      
// peer1.send([
//     { host: 'localhost', port: 4000 },
//     { host: 'localhost', port: 5000 },
//     { host: 'localhost', port: 6000 },
//     { host: 'localhost', port: 7000 }
// ], package);  
