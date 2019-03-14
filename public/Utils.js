const SHA256 = require("crypto-js/sha256");

var Utils = function() {};
Utils.prototype = {
    calculateHash: function(str) {
        return SHA256(str).toString();
    }
} 

module.exports = new Utils();
