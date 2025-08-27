const crypto = require('crypto');

class BlockchainSimulator {
  static generateHash(data, previousHash = '') {
    const content = previousHash + JSON.stringify(data) + Date.now();
    return crypto.createHash('sha256').update(content).digest('hex');
  }

  static createGenesisHash() {
    return this.generateHash({ genesis: true });
  }
}

module.exports = BlockchainSimulator;
