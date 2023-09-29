const axios = require('axios');

const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function getNameFromUser() {
  let name = '';
  const rl = readline.createInterface({ input, output });

  rl.question('Which name do you want to check if it is on the Gift List?\n', (answer) => {
    name = answer;

    rl.close();
  });

  return name;
}

async function getProof() {
  const name = await getNameFromUser();

  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();
  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);

  return { proof, name, root };
}

async function main() {
  const { proof, name, root } = getProof();

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
    root,
  });

  console.log({ gift });
}

getProof();

//main();
