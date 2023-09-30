const readlinePromises = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

async function getProof() {
  const name = await _getNameFromUser();

  const merkleTree = new MerkleTree(niceList);

  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  return { proof, name };
}

async function _getNameFromUser() {
  const rl = readlinePromises.createInterface({ input, output });

  const name = await rl.question('Which name do you want to check if it is on the Gift List?\n');

  rl.close();

  return name;
}

module.exports = getProof;