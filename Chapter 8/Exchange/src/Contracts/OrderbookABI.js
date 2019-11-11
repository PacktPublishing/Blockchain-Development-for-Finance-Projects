export default { 
  abi: [
    {
      "constant": true,
      "inputs": [],
      "name": "ERC20Counter",
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
      "constant": true,
      "inputs": [],
      "name": "ERC20Base",
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
          "name": "Base",
          "type": "address"
        },
        {
          "name": "Counter",
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
          "indexed": true,
          "name": "Order_No",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "trader",
          "type": "address"
        }
      ],
      "name": "BuyAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "Order_No",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "trader",
          "type": "address"
        }
      ],
      "name": "SellAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "Order_No",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Amt",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "Price",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "maker",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "taker",
          "type": "address"
        }
      ],
      "name": "TradeAdd",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "Amt",
          "type": "uint256"
        },
        {
          "name": "BuyPrice",
          "type": "uint256"
        }
      ],
      "name": "addBuy",
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
      "constant": false,
      "inputs": [
        {
          "name": "Amt",
          "type": "uint256"
        },
        {
          "name": "SellPrice",
          "type": "uint256"
        }
      ],
      "name": "addSell",
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
      "name": "viewLengthBuy",
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
      "inputs": [],
      "name": "viewLengthSell",
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
          "name": "OrderNo",
          "type": "uint256"
        }
      ],
      "name": "viewBuy",
      "outputs": [
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
      "constant": true,
      "inputs": [
        {
          "name": "OrderNo",
          "type": "uint256"
        }
      ],
      "name": "viewSell",
      "outputs": [
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
          "name": "OrderNo",
          "type": "uint256"
        },
        {
          "name": "Amt",
          "type": "uint256"
        },
        {
          "name": "TradePrice",
          "type": "uint256"
        },
        {
          "name": "trade_type",
          "type": "uint256"
        }
      ],
      "name": "trade",
      "outputs": [
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
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "decommission",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  address: "0x26518b6a8E4f8B20413C1Cf70DC05B58Cb5171A0"
  }