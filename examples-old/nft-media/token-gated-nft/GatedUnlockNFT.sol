/* How this code works:

This code contains two smart contracts: an "Unlock" NFT (UNFT)
and a "Gated" NFT (GNFT). The terms "Unlock" NFT and "Gated" NFT
are made up for this exercise, and aren't pre-existing terms.

The UNFT is a basic NFT, nothing special about it. The GNFT is a basic
NFT with some custom functionality: In order to mint a GNFT, you must
first own a UNFT. You need an "Unlock" NFT to mint the "Gated" NFT.

In order to check if a minter owns a UNFT, you must call the "balanceOf"
function from the UNFT contract in the mint function of the GNFT contract.

Key concepts:
* token-gated function interactions
* calling one contract's functions from another contract
*/


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/*
Contract UnlockNFT is a standard ERC721 contract generated
using the OpenZeppelin Contract Wizard. The only extra features
added are the "Mintable" feature and Auto Increment Ids feature.
The point is, there is nothing special about the Unlock NFT itself.
 */
contract UnlockNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    
    constructor() ERC721("UnlockNFT", "UNFT") {}

    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}

/*
Contract GatedNFT includes standard ERC721 functionality, but
with some custom code in the mint() function that requires a minter
to own at least one UNFT before they are able to mint a GNFT.
*/
contract GatedNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // a state variable to store the unlock NFT contract address
    address private _UNFTContractAddress;

    constructor() ERC721("GatedNFT", "GNFT") {}

    function safeMint(address to) public {

        // make sure the unlock NFT contract address has been set
        require(_UNFTContractAddress != 0x0000000000000000000000000000000000000000,
                "The UnlockNFT contract address has not been set"
                );
        
        UnlockNFT _unftContract = UnlockNFT(_UNFTContractAddress);
        // check that the minter's balance of UNFT is greater than 1
        require(_unftContract.balanceOf(msg.sender) > 0,
                "Need an UnlockNFT in order to mint"
                );

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // sets the unlock NFT contract address
    function setUnlockNFTSContractAddress(address _contractAddress)
        public
        onlyOwner {
        _UNFTContractAddress = _contractAddress;
    }

    // returns the address of the unlock NFT contract
    function getUnlockNFTSContractAddress()
        public
        view
        returns (address) {
        return _UNFTContractAddress;
    }
}

