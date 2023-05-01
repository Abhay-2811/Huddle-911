export const contractAdd = '0x287E825F551e309D8cD1a60d0C289eA942Ed51F0'

export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "Doctor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Client",
				"type": "address"
			}
		],
		"name": "ClaimAmount",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "Doctor",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "MeetLink",
				"type": "string"
			}
		],
		"name": "NotifyDoc",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "Doctor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "Client",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "MeetLink",
				"type": "string"
			}
		],
		"name": "ScheduleMeetClient",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "StakedData",
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