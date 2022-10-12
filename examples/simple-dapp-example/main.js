// MetaMask is our 'provider' in this case
const provider = new ethers.providers.Web3Provider(window.ethereum);

// You (whoever is signed into MetaMask) is the 'signer'
const signer = provider.getSigner();

// the 'contract' object allows us to call functions from our smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

// the 'contractWithSigner' object allows us to call smart contract functions that
// require us to send a transaction (like changing a number on the blockchain)
const contractWithSigner = contract.connect(signer);

async function init() {
  await provider.send("eth_requestAccounts", []);
}

init();


// EVENT LISTENERS

// when I click on the setNum button...
$('#setNum').click(function(){
  setNum();
})

// when I click on the getNum Button
$('#getNum').click(function(){
  getNum();
})

// checks the blockchain for the current number every 2 seconds
// so that the page can be updated automatically if the number
// is changed.
setInterval(function(){
  getNum();
}, 2000)

// FUNCTIONS

// CHANGING THE BLOCKCHAIN

async function getNum() {

  // grab the number from the contract
  const myNum = await contract.getNum();

  // convert the number into a more human-readable number
  const convertedNum = +myNum;
  
  // display the current number to your web page
  $('#currentNum').text(`${convertedNum}`)
}

// READING FROM THE BLOCKCHAIN

function setNum() {
  // grab the user input from the input text box
  
  // jQuery version
  const numToSet = $('#numInput').val();

  // convert the number they added to a number that Ethereum can
  // understand (a 'BigNumber')
  const convertedNum = ethers.utils.parseEther(numToSet);

  // pass the converted number to the contract
  contractWithSigner.setNum(numToSet);
}

