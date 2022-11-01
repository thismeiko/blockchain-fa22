/* CONNECT_AUTOMATICALLY
  true: automatically connect to Web3 Provider on page load.
  false: enable "click to connect" button
*/
const CONNECT_AUTOMATICALLY = true;

if(CONNECT_AUTOMATICALLY) {
  main();
} else {
  connectButton.onclick = main;
}

async function main() {

  // INITIALIZAING STEPS (SKIP TO THE BOTTOM TO WRITE YOUR OWN CODE)

  loadingIconConnect.style.display = "block";

  // Check website compatibility
  if(navigator.userAgent.indexOf("Safari") != -1
  && navigator.userAgent.indexOf("Chrome") == -1) {
    alert("Please switch to a browser that supports Web3 (Chrome, Firefox, Brave, Edge, or Opera)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("Browser is Web3 compatible");

  // Check if MetaMask is installed
  if(!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)");
    loadingIconConnect.style.display = "none";
    return;
  }
  console.log("MetaMask is installed");


  // (REQUIRED) Connect to a Web3 provider (MetaMask in most cases)
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  // If the network changes, refresh the page. (e.g. the user switches from mainnet to goerli)
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
        window.location.reload();
    }
  });

  try {
    // (REQUIRED) Request to connect current wallet to the dApp
    await provider.send("eth_requestAccounts", []);
  } catch(error) {
    const errorMessage = "Cannot connect to wallet. There might be an issue with another browser extenstion. Try disabling some browser extensions (other than MetaMask), then attempt to reconnect."
    console.error(errorMessage, error);
    alert(errorMessage);
    loadingIconConnect.style.display = "none";
    return;
  }  
  console.log("Wallet connected");


  // Check if user is signed in to correct network
  const chainId = await provider.getNetwork();
  if(chainId.chainId != 5) {
    alert("Please switch to the Goerli Test Network in MetaMask. The page will refresh automatically after switching.");
    loadingIconConnect.style.display = "none";
    textInputButton.setAttribute("disabled", "true");
    return;
  }
  console.log("Connected to Goerli");

  // AT THIS POINT, THE USER SHOULD BE SUCCESSFULLY CONNECTED TO THE DAPP

  // Update the page to show the user is connected
  connectionStatus.textContent = "🟢 Connected";

  connectButton.setAttribute("disabled", "true");
  textInputButton.removeAttribute("disabled");

  // (REQUIRED) Store the Signer in a variable
  const signer = provider.getSigner();

  // (REQUIRED) Create a contract object
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // (REQUIRED) Connect the signer to the contract
  const contractWithSigner = contract.connect(signer);

  // Display the address of the signed-in wallet
  const connectedWalletAddress = await signer.getAddress();
  connectedWallet.textContent = connectedWalletAddress;
  console.log(`Connected Wallet: ${connectedWalletAddress}`);

  // hide the loading icon
  loadingIconConnect.style.display = "none";

  

  //----------------------------------------------------//
  //-----------ADD YOUR CODE BELOW THIS LINE------------//
  //----------------------------------------------------//



  //////////// EVENT LISTENERS ////////////////

  // EVENT LISTENERS
  contract.on("MintEvent", (_tokenId, _text) => {
    textDisplay.textContent = _text;
  });

  textInputButton.onclick = mint;
  tokenIdInputButton.onclick = checkURI;


  ////////////// FUNCTIONS ///////////////////

  async function checkURI() {
    let tokenId = +tokenIdInput.value;
    let uri = await contract.tokenURI(tokenId);
    uriDisplay.textContent = uri;
  }

  function mint() {
    const newText = textInput.value;
    contractWithSigner.safeMint(newText);
  }
}