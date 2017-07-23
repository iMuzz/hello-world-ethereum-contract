// Ignore this file, this is me trying to get it working with a new version of web3

const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3();

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const address = '0x0bBAeE6e6371567978E68b85f974cC9aa2c09d87';

const code = fs.readFileSync('Voting.sol').toString()
const solc = require('solc')
const compiledCode = solc.compile(code)

const abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
const byteCode = compiledCode.contracts[':Voting'].bytecode

const VotingContract = new web3.eth.Contract(abiDefinition, null, {
  from: address, // default from address
  gasPrice: '20000000000' // default gas price in wei
});

VotingContract.deploy({
    data: byteCode,
    arguments: [['John', 'Doe']]
})
.send({
    from: address,
    gas: 999999,
    gasPrice: '20000000000'
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});

// .estimateGas(function(err, gas){
//     console.log(gas);
// });
// 62305953000000000000
// 61919809720000000000



// web3.eth.getAccounts().then(accounts => {
//   const address = accounts.shift();
//   console.log(address);

//   accounts.forEach(a => {
//     web3.eth.sendTransaction({
//       from: a,
//       to: address,
//     })
//   })
// })
