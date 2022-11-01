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
    increaseNumButton.setAttribute("disabled", "true");
    return;
  }
  console.log("Connected to Goerli");

  // AT THIS POINT, THE USER SHOULD BE SUCCESSFULLY CONNECTED TO THE DAPP

  // Update the page to show the user is connected
  connectionStatus.textContent = "🟢 Connected";

  connectButton.setAttribute("disabled", "true");

  const signer = provider.getSigner();
  console.log(await signer.getAddress());

  displayBalances();

  // hide the loading icon
  loadingIconConnect.style.display = "none";

  

  

  //----------------------------------------------------//
  //-----------ADD YOUR CODE BELOW THIS LINE------------//
  //----------------------------------------------------//



  ////////////// FUNCTIONS ///////////////////


  // A function to display balances of various wallet addresses
  async function displayBalances() {
    const ADDRESSES = [
      "0x80b6De9D077977798f357260F30b985dC7F1Bbb2",
      "0xafEe23Daf894eb23fA0d779948E60e220A9B081e",
      "0x0Ac76C1d84e0666cF42C1AE719fC53493B421c47",
      "0x503e662d61d46e23D83F9A2a82B3a2AF9FA59C5a",
      "0xD0E2b59aA094591F2cd6d959bD343b767e0A9716",
      "0xB5d648caE8Be126dBa58A187261A3d9A4DF9d273",
      "0xaEDDEFd243942A44EBc58fEF2159363E884E9Fff",
      "0x1F8278875dD863A1928b45dC1b330a3632DBE1c0",
      "0xF30e08441731108E83732fe4f5010109557711CC",
      "0xa9F0d529f189787fDf53f985ccB796B52f043b72",
      "0xBF2CB372d7E68eFf2f282333a2A3D48f9df5f556",
      "0xb6D6023344a1542b91187Eec57CCf3567753f425",
      "0x93C7c698337Ea5aB489C1a99bed25950d5eF4526",
      "0x579CcFE70Cd387034F6B4548Fc09744B2B9b9804",
      "0x5d6aaDBC195a3fc3CFa8697c46Bf62Ae1B7B29f3",
      "0x8136f4A2171c0c3E0e10C77FD894E84bEff980cE",
    ]
  
    const NAMES = [
      "Doug",
      "Kayla",
      "Suhani",
      "Jun",
      "Soomin",
      "Darius",
      "Annie",
      "Yuxuan",
      "Yao",
      "Yvonne",
      "Meiko",
      "Yimei",
      "Ezekiel",
      "Mary",
      "Andjela",
      "Juliana"
    ]

    for(let i = 0; i < ADDRESSES.length; i++) {

      const name = NAMES[i]
      const address = ADDRESSES[i];
      let balance = await provider.getBalance(address);
      balance = ethers.utils.formatEther(balance);
      //const balance = 0;

      const tableRow = document.createElement("tr");

      const nameCell = document.createElement("td"); 
      const addressCell = document.createElement("td"); 
      const balanceCell = document.createElement("td"); 
      
      const nameNode = document.createTextNode(name);
      const addressNode = document.createTextNode(address);
      const balanceNode = document.createTextNode(balance);

      nameCell.appendChild(nameNode);
      addressCell.appendChild(addressNode);
      balanceCell.appendChild(balanceNode);

      tableRow.appendChild(nameCell)
      tableRow.appendChild(addressCell)
      tableRow.appendChild(balanceCell)

      balancesTable.appendChild(tableRow);
      console.log(name, address, balance)
    }
  }

  
}