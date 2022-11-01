// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

  address public approvedAddress;
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 100 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public {
      require(approvedAddress != address(0), "Please set approvedAddress to contract address of the other contract");
      _mint(to, amount * 10 ** decimals());
      
      approve(approvedAddress, amount * 10**decimals());
    }

    function setApprovedAddress onlyOwner public(address _addr) {
      approvedAddress = _addr;
    }
}

contract PayXTokens {

  uint256 public num;
  address public tokenContract;
  address public owner;
  uint56 public const FEE = 10;

  constructor() {
    owner = msg.sender;
  }

  // in this function, you have to pay 1 MyToken in order to increase the number
  function increaseNum() {
    MyToken myToken = MyToken(tokenContract);
    bool transferred = myToken.transfer(address(this), FEE * 10**myToken.decimals());
    require(transferred, "Please pay 10 tokens to increase the number");
    num++;
  }

  // allows owner to set the address of the token after it is deployed
  function setTokenContract(address _addr) {
    require(msg.sender == owner, "Cannot set token address, must be owner");
    tokenContract = _addr;
  }
}


