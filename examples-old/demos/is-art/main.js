const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // the person signed into metamask is the 'signer'
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    $('#contractAddress').text(contractAddress);

    getStatus();

    $('#changeStatus').click(function() {
      changeStatus();
    })

    setInterval(function(){
      getStatus();
    }, 2000);

    async function getStatus() {
      const artStatus = await contract.getStatus();

      // console.log(artStatus)

      if(artStatus) {
        $('#status').text('art');
      } else {
        $('#status').text('not art');
      }

      return artStatus;
    }

    async function changeStatus() {
      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

      const tokenWithSigner = contract.connect(signer);

      tokenWithSigner.changeStatus();
    }