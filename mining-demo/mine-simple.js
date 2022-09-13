const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data){
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.nonce = 0; // nonce = number only used once
      this.hash = this.calculateHash();
      this.difficulty = 4;
  }

  calculateHash() {
      // calculate and store the hash
      let hash = SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce);

      // convert the hash to a string
      let hashString = hash.toString();

      // return the string
      return hashString;

  }

  // we want the hash of our block to begin with a certain amount of zeros
  mineBlock() {

      while(this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
          this.nonce++;
          //console.log(this.nonce);
          this.hash = this.calculateHash();
          console.log(this.hash);
      }

      console.log("\nBlock mined: " + this.hash + "\nNonce: " + this.nonce + "\n");
  }
}

let block = new Block(1, Date.now(), "Alice sends Bob 1 Token");

block.mineBlock();

