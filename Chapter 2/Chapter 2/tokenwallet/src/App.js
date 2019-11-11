import React, { Component } from 'react';
import Web3 from 'web3'
import Tokens20 from './Tokens/all20';
import Tokens721 from './Tokens/all721';
import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';
import InstallMetamask from './Components/InstallMetamask';



class App extends Component {
    constructor(){
        super();

        this.tokens20 = Tokens20;
		this.tokens721 = Tokens721;
        this.appName = 'TokenWallet';
        this.isWeb3 = true;                 
        this.newTransfer20 = this.newTransfer20.bind(this);
		this.newTransfer721 = this.newTransfer721.bind(this);
		this.newMint20 = this.newMint20.bind(this);
		this.newMint721 = this.newMint721.bind(this);
		this.newApprove20 = this.newApprove20.bind(this);
		this.newApprove721 = this.newApprove721.bind(this);
        this.closeTransfer = this.closeTransfer.bind(this);
        this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);

        this.state = {
            inProgress: false,
            tx20: null,
			tx721: null,
            network: 'Checking...',
            account: null,
            tokens20: [],
			tokens721: [],
            transferDetail20: {},
			transferDetail721: {},
			mintDetail20: {},
			mintDetail721: {},
			approveDetail20: {},
			approveDetail721: {},
            fields: {
                receiver: null,
                amount: null,
				metadata: null,
				tokenId: null,
                gasPrice: null,
                gasLimit: null,
            },
            defaultGasPrice: null,
            defaultGasLimit: 200000
        };
		}
  
    		
	
	
	
    setNetwork = () => {
        let networkName,that = this;

        this.web3.version.getNetwork(function (err, networkId) {
            switch (networkId) {
                case "1":
                    networkName = "Main";
                    break;
                case "2":
                    networkName = "Morden";
                    break;
                case "3":
                    networkName = "Ropsten";
                    break;
                case "4":
                    networkName = "Rinkeby";
                    break;
                case "42":
                    networkName = "Kovan";
                    break;
                default:
                    networkName = networkId;
            }

            that.setState({
                network: networkName
            })
        });
    };



	newTransfer20 = (index) => {
        this.setState({
            transferDetail20: this.state.tokens20[index]
        })
    };



	newTransfer721 = (index) => {
        this.setState({
            transferDetail721: this.state.tokens721[index]
        })
    };

	newMint20 = (index) => {
        this.setState({
            mintDetail20: this.state.tokens20[index]
        })
    };



	newMint721 = (index) => {
        this.setState({
            mintDetail721: this.state.tokens721[index]
        })
    };

	newApprove20 = (index) => {
        this.setState({
            approveDetail20: this.state.tokens20[index]
        })
    };



	newApprove721 = (index) => {
        this.setState({
            approveDetail721: this.state.tokens721[index]
        })
    };


	closeTransfer = () => {
        	this.setState({
            transferDetail20: {},
			transferDetail721: {},
			mintDetail20: {},
			mintDetail721: {},
			approveDetail20: {},
			approveDetail721: {},
            fields: {},
        })
	};

    setGasPrice = () => {
        this.web3.eth.getGasPrice((err,price) => {
            price = this.web3.fromWei(price,'gwei');
            if(!err) this.setState({defaultGasPrice: price.toNumber()})
        	});
    	};

    

    resetApp = () => {
      this.setState({
          transferDetail20: {},
		  transferDetail721: {},
          fields: {
              receiver: null,
              amount: null,
              gasPrice: null,
              gasLimit: null,
			  metadata: null,
			  tokenId: null,
          },
          defaultGasPrice: null,
      })
	  window.location.reload();
		
    };



    Transfer = () => {

        	this.setState({
            	inProgress: true
        			});
		
			//this.web3.eth.defaultAccount = window.web3.defaultAccount;
		
       		var contract;
			if (this.state.fields.metadata)
				{
		 			contract = this.web3.eth.contract(this.state.transferDetail721.abi).at(this.state.transferDetail721.address);
				}
			else
				{
         			contract = this.web3.eth.contract(this.state.transferDetail20.abi).at(this.state.transferDetail20.address);
				}
		
			let app = this; 
			var metadata;
			var tokenId;
			var amount;
		
			if(this.state.fields.metadata)
				{
		 			metadata = this.state.fields.metadata;
		 			tokenId = this.state.fields.tokenid;
				}
			else
				{
		 			amount = this.state.fields.amount  + 'e' + this.state.transferDetail20.decimal;	
		 			amount = new this.web3.BigNumber(amount).toNumber();
				}	
        
			
        	let receiver = this.state.fields.receiver.toString();
			let account = this.state.account;
        
			if(metadata)
				{
					contract.transferNFT(account,receiver, tokenId, metadata, (err,response)=>{
					
					if(response) {
                        		    console.log(response);
									app.resetApp();

                                	app.setState({
                                    tx20: response.tx20,
									tx721: response.tx721,
                                    inProgress: false
                                });
 						}else	{
                					console.log(err);
            					}
					});
				}
						 else
								{
									contract.transferFrom(account,receiver, amount, (err,response)=>{
            
									if(response) {
                                					console.log(response);
 	
                                					app.resetApp();

                                					app.setState({
                                    				tx20: response.tx20,
													tx721: response.tx721,
                                    				inProgress: false
                                					});
                               					}
									
									else		{
                									console.log(err);
            									}
        										});
								}	    
						};


    Mint = () => {

        this.setState({
            inProgress: true
        });
		
		//this.web3.eth.defaultAccount = window.web3.defaultAccount;
		
        var contract;
		if (this.state.fields.metadata)
		{
		contract = this.web3.eth.contract(this.state.mintDetail721.abi).at(this.state.mintDetail721.address);
		}
		else
		{
        contract = this.web3.eth.contract(this.state.mintDetail20.abi).at(this.state.mintDetail20.address);
		}
		
        let app = this; 
		var metadata;
		var amount;
		
		if(this.state.fields.metadata)
		{
		metadata = this.state.fields.metadata;
		}
		else
		{
		amount = this.state.fields.amount  + 'e' + this.state.mintDetail20.decimal;	
		amount = new this.web3.BigNumber(amount).toNumber();
		}	
        
        let receiver = this.state.fields.receiver.toString();
		
        		
		if(metadata)
		{
		contract.createNFT(receiver, metadata, (err,response)=>{
			if(response) {
                                console.log(response);
								app.resetApp();

                                app.setState({
                                    tx20: response.tx20,
									tx721: response.tx721,
                                    inProgress: false
                                });
 						}else{
                				console.log(err);
            				}
						});
		}
		else
		{
			contract.mint(receiver, amount, (err,response)=>{
            
			if(response) {
                                console.log(response);
 	
                                app.resetApp();

                                app.setState({
                                    tx20: response.tx20,
									tx721: response.tx721,
                                    inProgress: false
                                });
             }else{
                console.log(err);
            }
        });
		}    
	};



    Approve = () => {

        this.setState({
            inProgress: true
        });
		
		//this.web3.eth.defaultAccount = window.web3.defaultAccount;
		console.log(this.state.approveDetail721.address);
        var contract;
		if (this.state.approveDetail721.abi)
		{
		contract = this.web3.eth.contract(this.state.approveDetail721.abi).at(this.state.approveDetail721.address);
		}
		else
		{
        contract = this.web3.eth.contract(this.state.approveDetail20.abi).at(this.state.approveDetail20.address);
		}

		let app = this;
        let receiver = this.state.fields.receiver.toString();
		
	
		if (this.state.approveDetail20.abi)
		{
		let amount = this.state.fields.amount  + 'e' + this.state.approveDetail20.decimal;	
		amount = new this.web3.BigNumber(amount).toNumber();
		contract.approve(receiver, amount, (err,response)=>{
 
			if(response) {
                                console.log(response);
	
                                app.resetApp();

                                app.setState({
                                    tx20: response.tx20,
									tx721: response.tx721,
                                    inProgress: false
                                });
            }else{
                console.log(err);
            }
        });
	
		}
		else
		{
		let tokenid = this.state.fields.tokenid;
		contract.approve(receiver, tokenid , (err,response)=>{
 
			if(response) {
                                console.log(response);
	
                                app.resetApp();

                                app.setState({
                                    tx20: response.tx20,
									tx721: response.tx721,
                                    inProgress: false
                                });
            }else{
                console.log(err);
            }
        });
	
		}			    
	};

    onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
    };

    componentDidMount(){
	
		var account;
		
		if (window.ethereum) {
        const ethereum = window.ethereum;
        window.web3 = new Web3(ethereum);
	    this.web3 = new Web3(ethereum);
	
		ethereum.enable().then((accounts) => {
  		
		account = accounts[0];
 		this.web3.eth.defaultAccount = account ;
		
		let app = this;
		
		this.setState({
            account
        });

        this.setNetwork();
        this.setGasPrice();
        
        Tokens20.forEach((token) => {
            let contract = this.web3.eth.contract(token.abi);
            let erc20Token = contract.at(token.address);

            erc20Token.balanceOf(account,function (err,response) {
                if(!err) {
                    let decimal = token.decimal;
                    let precision = '1e' + decimal;
                    let balance = response.c[0] / precision;
                    let name = token.name;
                    let symbol = token.symbol;
                    let icon = token.icon;
                    let abi = token.abi;
                    let address = token.address;

                    balance = balance >= 0 ? balance : 0;

                    let tokens20 = app.state.tokens20;

                    if(balance > 0) tokens20.push({
                        decimal,
                        balance,
                        name,
                        symbol,
                        icon,
                        abi,
                        address,
                    });

                    app.setState({
                        tokens20
                    })
                }
            });
        });
		
		
		        Tokens721.forEach((token721) => {
            let contract = this.web3.eth.contract(token721.abi);
            let erc721Token = contract.at(token721.address);

               erc721Token.MDTrack(account,function (err,response) {
				if(!err) {
                    let name = token721.name;
                    let symbol = token721.symbol;
                    let icon = token721.icon;
                    let abi = token721.abi;
                    let address = token721.address;
					let tokenid = response.c[0];
						
                    tokenid = tokenid >= 0 ? tokenid : 0;
					if(tokenid!==0)
					{
					erc721Token.tokenURI(tokenid,function (err,response) {
						if(!err) {
						let metadata = response;                
						let tokens721 = app.state.tokens721;

                    tokens721.push({
  
                        name,
                        symbol,
						tokenid,		
                        icon,
                        abi,
                        address,
						metadata,
                    });

                    app.setState({
                        tokens721
                    })
					}
                });
            }
			}
			});
        });
		})
	}
	}						   
						   
		
	

						   
						   
    render() {
        if(this.isWeb3) {
       
                return (
                    <div>
                        <Nav appName={this.appName} network={this.state.network} />
                        <Description />
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                                   transferDetail20={this.state.transferDetail20}
								   transferDetail721={this.state.transferDetail721}
								   mintDetail20={this.state.mintDetail20}
								   mintDetail721={this.state.mintDetail721}
								   approveDetail20={this.state.approveDetail20}
								   approveDetail721={this.state.approveDetail721}
                                   closeTransfer={this.closeTransfer}
                                   newTransfer20={this.newTransfer20}
								   newTransfer721={this.newTransfer721}
								   newApprove20={this.newApprove20}
								   newApprove721={this.newApprove721}
					               newMint20={this.newMint20}
								   newMint721={this.newMint721}
                                   Transfer={this.Transfer}
								   Mint={this.Mint}
					               Approve={this.Approve}
                                   account={this.state.account}
                                   defaultGasPrice={this.state.defaultGasPrice}
                                   defaultGasLimit={this.state.defaultGasLimit}
                                   tx20={this.state.tx20}
								   tx721={this.state.tx721}
                                   inProgress={this.state.inProgress}
                                   fields={this.state.fields}
                                   tokens20={this.state.tokens20}
								   tokens721={this.state.tokens721}/>
                    </div>
                )
            }
        else{
            return(
                <InstallMetamask />
            )
        }
    }
}
export default App;
