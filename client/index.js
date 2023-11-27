const axios = require('axios');
const prompt = require('prompt-sync')();
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = prompt("Name?: ");
  const tree = new MerkleTree(niceList);
  const proof = tree.getProof(niceList.indexOf(name));

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    node: name,
    proof: proof
  });

  console.log({ gift });
}

main();