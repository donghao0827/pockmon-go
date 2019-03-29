const BN = require('big-number');
const BNum = require('./BN');

const fromB = function(buffer) {
    const reverseBuffer = buffer.reverse();
    const len = buffer.length;
    const newBuffer = [];
    for(let i = 0; i < len; i = i + 4) {
        const N = (buffer[i] ? buffer[i] : 0) + 
        (buffer[i + 1] ? buffer[i + 1] : 0)* 256 + 
        (buffer[i + 2] ? buffer[i + 2] : 0) * 256 * 256 + 
        (buffer[i + 3] ? buffer[i + 3] : 0) * 256 * 256 * 256;
        newBuffer.push(BN(N));
    }
    const len2 = newBuffer.length;
    let res = BN(0);
    for(let i = 0; i < len2; i++) {
        const radix = BN(256).mult(256).mult(256).mult(256);
        const coe = newBuffer[i];
        const term = BNum.sqrt(radix, i);
        res = BNum.add(BNum.mult(coe, term), res);
    }
    return res;
} 

module.exports = fromB;