export default {
    address: "0x26518b6a8E4f8B20413C1Cf70DC05B58Cb5171A0",
    abi: [
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
      "inputs": [],
      "payable": true,
      "stateMutability": "payable",
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
          "name": "BAcc",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "Amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Stat",
          "type": "bytes2"
        },
        {
          "indexed": false,
          "name": "DOI",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "DOE",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "LCAdd",
          "type": "address"
        }
      ],
      "name": "CreateLCSuccessful",
      "type": "event"
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
          "name": "BAcc",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "Amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Stat",
          "type": "bytes2"
        }
      ],
      "name": "ModifyLCSuccessful",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
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
          "name": "DOE",
          "type": "uint256"
        }
      ],
      "name": "createLC",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "lengthLC",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "viewLCNo",
          "type": "uint256"
        }
      ],
      "name": "viewLC",
      "outputs": [
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
          "type": "address"
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
          "name": "LCNum",
          "type": "uint256"
        },
        {
          "name": "SettleAmt",
          "type": "uint256"
        },
        {
          "name": "Stat",
          "type": "bytes2"
        }
      ],
      "name": "modifyLC",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
    }