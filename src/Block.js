var utils = require("../../public/Utils");
const MerkleTree = require('merkletreejs')

class Block {
   constructor(index, timestamp, txnCount, transactions, merkle, previousHash = '') {
      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.txnCount = txnCount;
      this.transactions = transactions;
      this.merkle = merkle;
      this.hash = utils.calculateHash(this.index + this.previousHash + this.timestamp + this.txCount + JSON.stringify(this.transactions)).toString();
   }

   calculateMerkleRoot(){
      const leaves = transactions.map(x =>utils.calculateHash(x));
      const tree = new MerkleTree(leaves, utils.calculateHash);
   }
}