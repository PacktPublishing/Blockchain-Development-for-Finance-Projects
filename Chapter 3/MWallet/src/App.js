import React, { Component } from 'react';
import Web3 from 'web3';
import Container from './Components/Container';
import Nav from './Components/Nav';
import Description from './Components/Description';
import Mnemonic from './Items/Mnemonic.js';
const bip39 = require('bip39');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util')






class App extends Component {
    constructor(){
        super();
		this.appName = 'Merchant Wallet';
       
		this.getAccountTransactions = this.getAccountTransactions.bind(this);
				
		this.state = {
			acc: null,
			accounts: [],
			transactions: [],
			mnemonic: Mnemonic
		}
	}
	
	getAccountTransactions = (accAddress) => {
  
		const startBlockNumber = 0; 
		let app = this;
		let transactions = this.state.transactions;
(async function main () {		
const endBlockNumber = await app.web3.eth.getBlockNumber()
		
  console.log("Searching for transactions to/from account \"" + accAddress + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

  for (var i = endBlockNumber; i > 0 ; i--) {
    
	  var block =  await app.web3.eth.getBlock(i, true);
	  
	  
    if (block != null && block.transactions != null) {
      console.log(i+"loop");
		block.transactions.forEach( function(e) {
        if (accAddress == "*" || accAddress == e.to) {
          console.log("  tx hash          : " + e.hash + "\n"
            + "   nonce           : " + e.nonce + "\n"
            + "   blockHash       : " + e.blockHash + "\n"
            + "   blockNumber     : " + e.blockNumber + "\n"
            + "   transactionIndex: " + e.transactionIndex + "\n"
            + "   from            : " + e.from + "\n" 
            + "   to              : " + e.to + "\n"
            + "   value           : " + e.value + "\n"
            + "   gasPrice        : " + e.gasPrice + "\n"
            + "   gas             : " + e.gas + "\n"
            + "   input           : " + e.input);
			let hash = e.hash;
			let blockNumber = e.blockNumber;
			let transactionIndex = e.transactionIndex;
			let from = e.from;
			let value = e.value/1000000000000000000;
			var confirmations;
			
			var cflag;
			if( i >= e.blockNumber)
			{
			confirmations = endBlockNumber - e.blockNumber
				
			}
			
			if(confirmations > 40)
			{
				cflag= "Confirmed";  
			}
			else
			{
				cflag = "Unconfirmed";
			}
				
			transactions.push({
                        transactionIndex,
                        hash,
						blockNumber,
						from,
						value,
						confirmations,
						cflag
						
                    });
			app.setState({						
                        transactions
					})
			
        }
      })
    }
  }
	let acc=accAddress;
	app.setState({						
                        acc
					})
	console.log("State");
	console.log(app.state.acc);
})();
}
	
	
	
	
componentDidMount(){		
	let app = this;
		let accounts = this.state.accounts;
		let pathid = 100;
		this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));		
console.log(this.state.mnemonic);		
	(async function main() {
	   
	const seed  = await bip39.mnemonicToSeed(app.state.mnemonic)  
	const root = hdkey.fromMasterSeed(seed);
	
		var i = 0;
		for (i = 0 ; i <=pathid; i++)
		{	
			if(i <=pathid)
			{
			
			var path = "m/44'/60'/0'/0/"+i;
			const addrNode = root.derive(path);
				
			const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
			const addr = ethUtil.publicToAddress(pubKey).toString('hex');
			const address = ethUtil.toChecksumAddress(addr);
				
			app.web3.eth.getBalance(address,function (error, result){
			if(!error)
			{
				let balance = result / 1000000000000000000;
				if (balance >0)
				{
				accounts.push({
                        address,
                        balance,
                    });
		
		app.setState({
                        accounts
       
					})
				}
		}
				
				
		});
		}
		}
	})();
			 }
		
		

		
	 
		
    render() {
               
                return (
                    <div>
					<Nav appName={this.appName}/>
						<div>                        </div>
						<Description acc={this.state.acc}/>                       
						<Container 
							acc={this.state.acc}
							accounts={this.state.accounts}
							transactions={this.state.transactions}
							getAccountTransactions={this.getAccountTransactions}/>
							
									</div>
                		)
           
        }
    }

export default App;
