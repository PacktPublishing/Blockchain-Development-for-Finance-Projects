import React, { Component } from 'react';
import Web3 from 'web3'
import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';
import LCMaster from './Contracts/LCMaster';
import LCabi from './Contracts/LCabi';


class App extends Component {
	
	constructor(){
        super();
		
		this.LCMaster = LCMaster;
		this.LCabi = LCabi;
		
        this.appName = 'GreenGables Bank';
        this.closeTab = this.closeTab.bind(this);
		this.resetApp = this.resetApp.bind(this);
		this.viewLC = this.viewLC.bind(this);
		this.viewSingleLC = this.viewSingleLC.bind(this);
        this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
        this.state = {
					role: null,
					option: null,
					LCNew: [],
					LC: [],
					fields: {
						BuyerAccount: null,
						SellerAccount: null,
                		Amount: null,
                		DOExpiry: null,
						DocHash: null,
						LCNo: null
                            },
                    };
        }
	
	BuyerSessionView = () => {
        this.setState({
            role: 'Buyer',
			option: 'View'
			
        })
		this.viewLC();
		
	};
	
    BankSessionCreate = () => {
        this.setState({
            role: 'Bank',
			option: 'Create'
        })
	};

	BankSessionView = () => {
        this.setState({
            role: 'Bank',
			option: 'View'
        })
		this.viewLC();
	};
		
	SellerSessionView = () => {
        this.setState({
            role: 'Seller',
			option: 'View'
        })
		this.viewLC();
    };

SellerSessionVSettle = (LCNo) => {
        this.setState({
            role: 'Seller',
			option: 'Settle',
			fields: {
				LCNo: LCNo
			}
        })
	    };

SellerSessionSettle = () => {
        this.setState({
            role: 'Seller',
			option: 'Settle'
        })
		
    };

onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
    };


closeTab = () => {
        this.setState({
            role: null,
			option: null,
            fields: {},
        })
    };

closeViewTab = () => {
        this.setState({
			option: 'View',
        })
    };

resetApp = () => {
        this.setState({
			role: null,
			option: null,
			fields: {
					BuyerAccount: null,						
                	SellerAccount: null,	
                    Amount: null,	
                	DOExpiry: null,
					DocHash: null,
					LCNum: null
                    },
		})          
	window.location.reload();
    };

createLC = () => {
	
	let app = this; 
	var contract = new this.web3.eth.Contract(this.LCMaster.abi, this.LCMaster.address);	
	
	let dateExpiry = this.state.fields.DOExpiry;
	let year = dateExpiry.slice(0,4);
	
	let month = dateExpiry.slice(4,6)-1;
	let day = dateExpiry.slice(6,8);
	var DateTemp = new Date(year, month, day, 23, 59, 59, 0)
	var DOE = Math.floor(DateTemp.getTime()/1000.0)
	
	contract.methods.createLC(this.state.fields.BuyerAccount,this.state.fields.SellerAccount, 
					  this.state.fields.Amount,DOE).send({from: app.web3.eth.defaultAccount}).then(function(response){
						
						if(response) {
                        		    console.log("LC No.");
									console.log(response);
									app.resetApp();
									}
							
	})
	}


settleLC = () => {
	
	let app = this; 
	var contractMaster = new this.web3.eth.Contract(this.LCMaster.abi,this.LCMaster.address);
	contractMaster.methods.viewLC(app.state.fields.LCNo).call().then(function(response){												
						if(response) {
						let LCAddress = response[6];
							
						var contractLC = new app.web3.eth.Contract(app.LCabi.abi,LCAddress);
						contractLC.methods.settleLC(app.state.fields.Amount,app.state.fields.DocHash)
											.send({from: app.web3.eth.defaultAccount})
											.then(function(response){
						
												if(response) {
                        		    			console.log(response);
												app.resetApp;
												}
												
											})
										}
										})
}
																																																																																																																																																																			

viewSingleLC = (LCAdd) => {
	
	let app = this;
	app.setState({
                        LC: [],
				});
		
	var contract = new this.web3.eth.Contract(this.LCabi.abi,LCAdd);
	
	contract.methods.viewLCdetails().call().then(function(response){	
		if(response) {
						let LCNo = response[0];	
    					let BuyerAcc = response[1];
						let SellerAcc = response[2];
						let Amount = response[3];
						let IniAmount = response[4];
						let Status = app.web3.utils.hexToAscii(response[5]);																																																																																																																																																																																																																																																																																																																																																																								
                    	let DOI = response[6];
						let DOE = response[7];
						let DocHash = response[8];	
						
						let LC = app.state.LC;
		
						LC.push({
                        LCNo,
						BuyerAcc,
                        SellerAcc,
                        Amount,
						IniAmount,	
                        Status,
                        DOI,
                        DOE,
                        DocHash
                    });
			
			app.setState({
                        LC,
						option: 'ViewSingleLC'
                    })
			
			
		}
	})
}


viewLC = () => {
	
	let app = this;
	var lastLC;
	
	
	var contract = new this.web3.eth.Contract(this.LCMaster.abi,this.LCMaster.address);
	contract.methods.lengthLC().call().then(function(response){
		
		
		     if(response) {
				lastLC = response;
						 
			if (lastLC > 1)
			{
				
				app.setState({
                        LCNew: [],
                    })
		
				
	for (let i = 1; i < lastLC ; i++)
	{
		
		contract.methods.viewLC(i).call().then(function(response){
						
						
						if(response) {
						let LCNo = i;	
    					let SAcc = response[0];
						let BAcc = response[1];
						let Amount = response[2];			
						let Status = app.web3.utils.hexToAscii(response[3]);	
						let DOI = response[4];
						let DOE = response[5];
						let LCAdd = response[6];	
						
						let LCNew = app.state.LCNew;
						
							LCNew.push({
                        LCNo,
						BAcc,
                        SAcc,
                        Amount,
                        Status,
                        DOI,
                        DOE,
                        LCAdd
                    });

                    app.setState({
                        LCNew
                    })
					}
	              })
			}
			}
			 }
	})
}
	
					  
		
componentDidMount(){
	
		var account;
	

if (window.ethereum) {
        const ethereum = window.ethereum;
        window.web3 = new Web3(ethereum);
	    this.web3 = new Web3(ethereum);
	
		ethereum.enable().then((accounts) => {
  		
		this.web3.eth.defaultAccount = accounts[0];
		account = accounts[0];
			
 		
		
		let app = this;
		
		this.setState({
            account			
        });
			
		})
	}
}

			
    
    render() {
       return (
                    <div>
                        <Nav appName={this.appName}/>
                        <Description />
                        <Container role={this.state.role}
					               option={this.state.option}
								   account = {this.state.account}
								   LCNew = {this.state.LCNew}
		   						   LC = {this.state.LC}
					               viewLC = {this.viewLC}
								   createLC = {this.createLC}
		   						   settleLC = {this.settleLC}
								   viewSingleLC = {this.viewSingleLC}
								   BuyerSessionView =  {this.BuyerSessionView}
								   BankSessionCreate =  {this.BankSessionCreate}
								   BankSessionView =  {this.BankSessionView}
					               SellerSessionView =  {this.SellerSessionView}
		   						   SellerSessionSettle = {this.SellerSessionSettle}
		   						   SellerSessionVSettle = {this.SellerSessionVSettle}
								   onInputChangeUpdateField={this.onInputChangeUpdateField}
								   fields={this.state.fields}
								   closeTab =  {this.closeTab}
								   closeViewTab =  {this.closeViewTab}
                                    />
                    </div>
                )
}
}	

export default App;
