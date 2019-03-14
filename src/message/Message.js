var utils = require("../../public/Utils");

class Message {
    constructor(version, uuid, sponsor, type, domainInfo, timestamp) {
        this.version = version;
        this.uuid = uuid;
        this.sponsor = sponsor;
        this.type = type;
        this.domainInfo = domainInfo;
        this.timestamp = timestamp;
        this.signature = utils.calculateHash(this.version + this.uuid + this.sponsor + this.type + JSON.stringify(this.domainInfo) + this.timestamp);
    }

    buildMessage() {
        return {
            "version": this.version,
            "uuid": this.uuid,
            "sponsor": this.sponsor,
            "type": this.type,
            "domainInfo": this.domainInfo,
            "timestamp": this.timestamp,
            "signature": this.signature
        }
    }
}

module.exports = Message;