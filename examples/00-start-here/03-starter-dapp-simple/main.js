/* CONNECT_AUTOMATICALLY
  true: automatically connect to Web3 Provider on page load.
  false: enable "click to connect" button
*/
const CONNECT_AUTOMATICALLY = false;

if(CONNECT_AUTOMATICALLY) {
  main();
} else {
  connectButton.onclick = main;
}

async function main() {

  // INITIALIZAING STEPS (SKIP TO THE BOTTOM TO WRITE YOUR OWN CODE)

  // Check website compatibility
  if(navigator.userAgent.indexOf("Safari") != -1
  && navigator.userAgent.indexOf("Chrome") == -1) {
    alert("Please switch to a browser that supports Web3 (Chrome, Firefox, Brave, Edge, or Opera)");
    return;
  }

  // Check if MetaMask is installed
  if(!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)");
    return;
  }

  // (REQUIRED) Connect to a Web3 provider (MetaMask in most cases)
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // If the network changes, refresh the page. (e.g. the user switches from mainnet to goerli)
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
        window.location.reload();
    }
  });

  // (REQUIRED) Connect to signed-in account. If not signed in, MetaMask will prompt you to sign in
  await provider.send("eth_requestAccounts", []);

  // Check if user is connected to Goerli
  const chainId = await provider.getNetwork();
  if(chainId.chainId != 5) {
    alert("Please switch to the Goerli Test Network in MetaMask. The page will refresh automatically after switching.");
    return;
  }
  connectButton.setAttribute("disabled", "true");
  increaseNumButton.removeAttribute("disabled");

  // (REQUIRED) These are your primary variables for interacting with your smart contract
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(signer);

  //----------------------------------------------------//
  //-----------ADD YOUR CODE BELOW THIS LINE------------//
  //----------------------------------------------------//

  displayNumber();

  //////////// EVENT LISTENERS ////////////////

  // Listen for the "NumIncreasedEvent" to emit from the contract
  contract.on("NumIncreasedEvent", (message, newNumber) => {
    console.log(message);
    currentNumberDisplay.textContent = newNumber;
  });

  increaseNumButton.onclick = increaseNumber;


  ////////////// FUNCTIONS ///////////////////

  function increaseNumber() {
    // Call the 'increaseNum()' function in the contract
    contractWithSigner.increaseNum();
  }

  async function displayNumber() {
    // Call the 'getNum()' function in the contract
    currentNumberDisplay.textContent = await contract.getNum();
  }
}