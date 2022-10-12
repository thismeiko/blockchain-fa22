// change this each time you deploy a new contract
var contractAddress = "0xba1CB9525Fc13112A75eD812B91A2Fb0014ddFed";

// paste contract ABI here
var contractABI = [
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
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setNum",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]