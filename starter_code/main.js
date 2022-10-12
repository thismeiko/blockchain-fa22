async function main() {

  if(!window.ethereum) {
    alert("No Web3 Provider detected, please install MetaMask")
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const contractWithSigner = contract.connect(signer);

  // if network changes (e.g. mainnet to goerli, refresh page)
  provider.on("network", (newNetwork, oldNetwork) => {
    if (oldNetwork) {
        window.location.reload();
    }
  });

  //---- EVERYTHING ABOVE THIS LINE SHOULD BE AT THE TOP OF ANY JAVASCRIPT FILE NEEDED FOR A WEB3-ENABLED SITE ----//

  /*
  *
  *
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  * 
  */

  //-----------ADD YOUR CODE BELOW THIS LINE------------//

  ///// THINGS THAT HAPPEN WHEN THE PAGE LOADS

  displayCurrentNumber();
  signerDisplay.textContent = await signer.getAddress();


  //////////////////////////// EVENT LISTENERS

  // contract event: emits when NumIncreased is called
  contract.on("NumIncreased", (message, newNumber) => {
    console.log(message, +newNumber);
    currentNum.textContent = +newNumber;
  });

  // click button to increase num 
  increaseNumButton.addEventListener('click', function() {
    contractWithSigner.increaseNum();
    console.log("ok")
  })

  
  //////////////////////////// FUNCTIONS

  async function displayCurrentNumber() {
    let numFromContract = await contract.getNum();
    console.log(+numFromContract)
    currentNum.textContent = +numFromContract;
  }

}

connect.onclick = function() {
  main();
}








