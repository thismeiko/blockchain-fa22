const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0; // nonce = number only used once
        this.hash = this.calculateHash();
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
    mineBlock(difficulty) {

        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            // console.log(this.nonce);
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash + "\nNonce: " + this.nonce + "\n");

    }
}

class Blockchain {
    constructor() {
        // this.chain = [];

        // implement after creating createGenesisBlock
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 6;
    }

    createGenesisBlock() {
        return new Block(0, "09/22/2020", "Genesis Block", "0");
    }

    // returns latest block in the chain
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // adds a block to the chain, accepts a Block object
    addBlock(newBlock) {
        // get the hash of the latest block
        newBlock.previousHash = this.getLatestBlock().hash;

        newBlock.mineBlock(this.difficulty);

        // add the new block to the chain
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

// create an instance of the coin

let demoCoin = new Blockchain();

console.log("\n$$$$$$$$$$$$$$$$$$$$$ MINING TIME $$$$$$$$$$$$$$$$$$$$$\n")

console.log("Mining block 1...");
demoCoin.addBlock(new Block(1, "09/2f2/2020", {amount: 4}));

console.log("Mining block 2...");
demoCoin.addBlock(new Block(2, "09/22s/2020", {amount: 494}));

console.log("Mining block 3...");
demoCoin.addBlock(new Block(3, "09/2a2/2020", {amount: 800}));

console.log("is blockchain valid? " + demoCoin.isChainValid());


