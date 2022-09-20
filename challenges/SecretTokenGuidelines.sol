/*

CODING CHALLENGE:
Secret Token

SUMMARY:
Create a fungible token that anyone can mint more of (as long as they know the secret passphrase ;) )

GUIDELINES:
This challenge combines solidity concepts from Weeks 1 and 2. Using the starter code in the contract below, finish building the contract with all the necessary functionality. Places where you need to add your own code will be marked in the contract below like this:

/* YOUR CODE: add whatever is specified in the comment */

/*

BONUS CHALLENGE:
Setting a mint limit

A contract where anyone can mint as many tokens as they want, as long as they have the passphrase, will likely result in one person minting out the maximum amount of tokens that Ethereum supports. Since token balances are stored using a uint256, that max number is (2^256)-1, which is a HUGE number!

It would make sense to limit the amount of tokens someone is able to hold. To do this, you should first decide the max balance of tokens a wallet can hold (eg., 1000). Then, inside the mint function, you should check to see that the amount the user is trying to mint doesn't exceed the max balance you've set. 

For example, let's say the max balance someone can have is 1000 tokens. If someone already holds 500, and they try to mint 700, the transaction should fail.

*/


/****************** Begin Contract *******************/


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SecretToken is ERC20 {

  ///////////////////////////////////////// VARIABLES


  /* YOUR CODE: Create a public variable called "secretPhrase" to store a secret phrase (hint: you'll want to store the hash of the phrase, not the phrase itself) */
  
  /* YOUR CODE: Create a public variable called "owner" to store the address of the account that deploys the contract */

  /* BONUS CHALLENGE, YOUR CODE: Create a constant variable called "MAX_BALANCE" to store a number value of your choice that you can refer to elsewhere in your contract. See the "constants" example from Solidity by Example (https://solidity-by-example.org/constants/) */



  ///////////////////////////////////////// FUNCTIONS

  constructor() ERC20("SecretToken", "SCRT") {

    /* YOUR CODE: set the owner variable to the address of the account that deploys the contract (hint: use msg.sender to get the address of the contract deployer */

  }

  function mint(address to, uint256 amount, string memory _guess) public {

    /* In the require statement below, require that the hash of the _guess that the user enters when they call the mint function is the same as the secretPhrase variable stored in the contract. (hint: you'll need to use == as part of your expression) */

    require(/* YOUR CODE */, "Pass phrase you invalid, cannot mint tokens");

    /* BONUS CHALLENGE: In the require statement below, require that the amount the user is attempting to mint doesn't force them to exceed the MAX_BALANCE constant you set above. (hint, you'll need to use the balanceOf() function as part of your expression.) */

    require(/* YOUR CODE */, "Minting this amount of tokens would make you exceed your allowed balance. Please reduce the number of tokens you wish to mint");

    _mint(to, amount);
  }

  function setPhrase() public {

    /* YOUR CODE: a function to set the secret phrase. Be sure to require that only the owner of the contract is able to set the secret phrase. */

  }
}