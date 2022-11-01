// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract IsArt {

  bool public isArt = false;

  function changeStatus() public {
    isArt =! isArt;
  }

  function getStatus() public view returns (bool) {
    return isArt;
  }
}