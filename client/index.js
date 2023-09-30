const axios = require('axios');

const getProof = require('../utils/getProof');

const serverUrl = 'http://localhost:1225';

async function main() {
  const { proof, name, root } = await getProof();
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
    root,
  });

  console.log({ gift });
}

main();
