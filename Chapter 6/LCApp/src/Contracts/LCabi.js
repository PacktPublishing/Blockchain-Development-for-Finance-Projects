export default {
    "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "ERC20Interface",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "LCNum",
          "type": "uint256"
        },
        {
          "name": "BAcc",
          "type": "address"
        },
        {
          "name": "SAcc",
          "type": "address"
        },
        {
          "name": "Amt",
          "type": "uint256"
        },
        {
          "name": "DOI",
          "type": "uint256"
        },
        {
          "name": "DOE",
          "type": "uint256"
        },
        {
          "name": "bankadd",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "LCNum",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "SAcc",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "Amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "IAmt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Stat",
          "type": "bytes2"
        },
        {
          "indexed": false,
          "name": "DocH",
          "type": "bytes32"
        }
      ],
      "name": "SettleLCSuccessful",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "viewLCdetails",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "bytes2"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "uint256"
        },
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "SettleAmt",
          "type": "uint256"
        },
        {
          "name": "DocH",
          "type": "bytes32"
        }
      ],
      "name": "settleLC",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}