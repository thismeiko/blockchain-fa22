// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SecretMessage {
  bytes32 public answer; // store the answer in the contract
  address private owner; // set the owner to be the person who deployed the contract

  // the constructor is called when the contract is deployed
  constructor() {
    // sets the owner to the address of the contract deployer
    owner = msg.sender;
  }

  // allows the contract owner to permanently set the secret answer
  // CHALLENGE: how might we change this function so that the secret message
  // can only be set one time? (there are multiple approaches)
  function setSecretAnswer(string memory _text) public {
    require(owner == msg.sender, "Only owner can set the answer");
    answer = keccak256(abi.encodePacked(_text));
  }

  // allows anyone to guess the secret answer
  function guessSecretAnswer(string memory _guess) public view returns (bool)
  {
    return keccak256(abi.encodePacked(_guess)) == answer;
  }

  // allows anyone to view the answer hash (doesn't reveal the secret message)
  function getAnswerHash() external view returns (bytes32) {
    return answer;
  }

  // allows anyone to test out hashing any input text
  function hashTest(string memory _text) external pure returns (bytes32) {
    return keccak256(abi.encodePacked(_text));
  }
}
