// The address to the smart contract. The contract must be deployed to a public blockchain (test or otherwise) in order to be accessed through a website
var contractAddress = "0x6c6Ea96A087D9E6CFfe8718c2c3377c53eDBaDA6";

// The ABI (Application Binary Interface) is a standardized list of the functions in our contract. The ABI allows our website to execute the functions written in the smart contract.
var contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newNumber",
				"type": "uint256"
			}
		],
		"name": "NumIncreasedEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "increaseNum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "num",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]