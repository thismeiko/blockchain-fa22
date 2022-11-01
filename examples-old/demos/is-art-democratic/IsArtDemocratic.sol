// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract IsArt {

  bool public isArt; // defaults to false
  uint256 public yesVotes;
  uint256 public noVotes;


  function voteYes() public {
      yesVotes++;
  }

  function voteNo() public {
      noVotes++;
  }

  function getStatus() public returns (bool) {
    
    require(yesVotes != noVotes, "This contract's status as art is currently disputed. Please vote yes or no.");

    if(yesVotes > noVotes) {
        isArt = true;
    } else {
        isArt = false;
    }

    return isArt;
  }
}