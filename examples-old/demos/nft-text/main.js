connectButton.onclick = main;

async function main() {
  
  if(!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask (https://metamask.io)")
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const chainId = await provider.getNetwork();
  if(chainId.chainId != 5) {
    alert("Please switch to the Goerli Test Network.");
    return;
  }
  
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(signer);

  alert("Connected")

  // if network changes, refresh the page
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
        window.location.reload();
    }
  });

  //-----------ADD YOUR CODE BELOW THIS LINE------------//

  // EVENT LISTENERS
  contract.on("MintEvent", (_tokenId, _text) => {
    textDisplay.textContent = _text;
  });
 
  textInputButton.onclick = mint;
  
  tokenIdInputButton.onclick = checkURI;

  async function checkURI() {
    let tokenId = +tokenIdInput.value;
    let uri = await contract.tokenURI(tokenId);
    uriDisplay.textContent = uri;
  }

  async function mint() {
    const newText = textInput.value;
    contractWithSigner.safeMint(newText);
  }
}