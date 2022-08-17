// SPDX-License-Identifier: MIT
// for more information, https://dougrosman.notion.site/Token-gated-NFT-a26dc9a1798949ff89321763414ede81
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Owning at least 1 UnlockNFT is required in order to mint a GatedNFT
// This UnlockNFT contract is a generic ERC721 contract
contract UnlockNFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("UnlockNFT", "UNFT") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }
}

// A GatedNFT cannot be minted unless the minter owns an Unlock NFT
contract GatedNFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("GatedNFT", "GNFT") {}

    // adding the UnlockNFT _unlockNFT parameter to the function. This requires
    // the person minting the NFT to manually insert the UnlockNFT contract address
    // when they call the function. Alternatively, the address could be hard-coded into
    // the contract, but I guess that doesn't make things that much easier, since you
    // still have to deploy one contract, grab the address, then put it in the other
    // contract. 

    // Contracts are a lot like classes. The functions of a contract become methods.

    // the address to the contract you're importing is passed in when the function is called.
    function safeMint(UnlockNFT _unlockNFT, address to) public onlyOwner {
        require(unlockNFT.balanceOf(msg.sender) > 0, "Need an UnlockNFT in order to mint");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    // alternative version 1, the contract address is hardcoded into the contract.
    // function safeMint(address to) public onlyOwner {

    //     // store the UnlockNFT contract in a variable called unlockNFT. The 'UnlockNFT' must
    //     // precisely match the name of the contract you're importing (including case)
    //     // note: The UnlockNFT contract must be deployed first in order to get the address
    //     UnlockNFT unlockNFT = UnlockNFT(0xe2899bddFD890e320e643044c6b95B9B0b84157A);

    //     // call the balanceOf() function from the unlockNFT contract to check the minter's
    //     // balance of unlockNFT. If they have at least 1, they can mint.
    //     require(unlockNFT.balanceOf(msg.sender) > 0, "Need an UnlockNFT in order to mint");
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    // }

    // alternative version 2, where the address to the contract you're importing is passed in
    // when the function is called, and passed in as an address explicitly, instead of as
    // a contract
    // function safeMint(address contractAddress, address to) public onlyOwner {
    //     UnlockNFT unlockNFT = UnlockNFT(contractAddress)
    //     require(unlockNFT.balanceOf(msg.sender) > 0, "Need an UnlockNFT in order to mint");
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    // }
}