const fs = require('fs');
const solc = require('solc')
const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const address = '0x4e3eb0fb84fc73398c9e70591cc56897a89d97d8';

const code = fs.readFileSync('Voting.sol').toString()
const compiledCode = solc.compile(code)

const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
const byteCode = compiledCode.contracts[':Voting'].bytecode

const VotingContract = web3.eth.contract(abiDefinition)
const deployedContract = VotingContract.new(['Rama','Nick','Jose'], {
  data: byteCode,
  from: web3.eth.accounts[0], gas: 4712388
});

const contractInstance = VotingContract.at(deployedContract.address)


contractInstance.totalVotesFor.call('Rama')

// Current error..
// Error: Error: VM Exception while executing eth_call: invalid opcode