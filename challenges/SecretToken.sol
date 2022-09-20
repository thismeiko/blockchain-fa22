/* CODING CHALLENGE: Secret Token */

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SecretToken is ERC20 {

  ///////////////////////////////////////// VARIABLES

  /* YOUR CODE: Create a public variable called "answer" */
  
  /* YOUR CODE: Create a public variable called "owner" */

  /* BONUS CHALLENGE, YOUR CODE: Create a public constant variable called "MAX_BALANCE" */


  ///////////////////////////////////////// FUNCTIONS

  constructor() ERC20("SecretToken", "SCRT") {

    /* YOUR CODE */

  }

  function mint(address to, uint256 amount, string memory _guess) public {

    require(/* YOUR CODE */, "Pass phrase you invalid, cannot mint tokens");

    require(/* BONUS CHALLENGE, YOUR CODE */, "Minting this amount of tokens would make you exceed your allowed balance. Please reduce the number of tokens you wish to mint");

    _mint(to, amount);
  }

  function setPhrase() public {

    /* YOUR CODE */

  }
}