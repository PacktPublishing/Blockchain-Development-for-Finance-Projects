import React, { Component } from 'react';
import Nav from './Components/Nav';
import Description from './Components/Description';
import Container from './Components/Container';



class App extends Component {
    constructor(){
        super();
        this.appName = 'Remittance App';
		this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
        
		this.state = {
            userId: 1,	
            network: 'Private Testnet',
			server: 'localhost:8000',
            account: null,
			balance: 0,
			selectedFile: null,
			transactions: [],
			name: '',
			trans: [],
			ViewFlag: 1,
			TransFlag: 1,
			     fields: {
				rname: null,	 
				rbank: null,
                raddress: null,
				raccount: null,
                amount: null
				       }
		}     
		}
		
  


setAccount = (flag) => {
	
    let app = this;
	
	var server = this.state.server;
	
	console.log("flag",flag);
	
	if (flag == 2)
	{
	server =  'localhost:8001' 			    
	};
		
	
	
	console.log("userId",this.state.userId);
	console.log(server);
	    
	var url = 'http://'+ server +'/customerinfo';
	fetch(url, {
    method: 'POST',
	headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
	},	
	body: JSON.stringify({
						userId : app.state.userId						
						})	
	}).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
		
        var bank;
		
		if(flag == 1)
		{
			bank = 'Bank A';
		}
		else
		{
			bank = 'Bank B';
		}	
		
		app.setState({
			name: data.name,
			account: data.account,
			balance: data.balance,
			address: data.address,
			bank: bank,
			server: server
        });
	
	//this.Eventhandler();	

})
}			

onChangeHandlerInv = event =>{
		
		console.log(event.target.files[0]);
	 
		this.setState({
	  	InvFile:  event.target.files[0],
		InvFname: event.target.files[0].name			
    })
		
    }


onChangeHandlerBOE = event =>{
		
		console.log(event.target.files[0]);
	 
		this.setState({
	  	BOEFile:  event.target.files[0],
		BOEFname: event.target.files[0].name			
    })
		
    }


onChangeHandlerDoc = event =>{
		
		console.log(event.target.files[0]);
	 
		this.setState({
	  	DocFile:  event.target.files[0],
		DocFname: event.target.files[0].name			
    })
		
    }

    

TabView = (flag) => {
	
	if( flag == 2)
	{
		this.TransSet(2);
		this.setTransactions();
	}
	
	this.setState({
			ViewFlag: flag			
        });
}


TransSet = (flag) => {
	
	this.setState({
			TransFlag: flag
			
        });
}

	
setTransactions()
{
let app = this;    
	var url = 'http://'+ this.state.server +'/gettrans';
	fetch(url, {
    method: 'POST',
	headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
	},body: JSON.stringify({
						account : app.state.account						
						})	
	
	}).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
		
        app.setState({
            trans: data.tx 
        });
})
}	

setBalance = () => {
	let app = this;    
	var url = 'http://'+ this.state.server +'/customerinfo';
	fetch(url, {
    method: 'POST',
	headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
	},body: JSON.stringify({
						userId : app.state.userId						
						})	
	
	}).then(function(response,error){
		if(response)
		{
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
		
        app.setState({
			balance: data.balance
        });
	


})
}

payment = () => {
	
   const data = new FormData();

   data.append('sname',this.state.name);
   data.append('saccount',this.state.account);
   data.append('sbank',this.state.bank);
   data.append('saddress',this.state.address);			
   data.append('rname',this.state.fields.rname);
   data.append('raccount',this.state.fields.raccount);
   data.append('rbank',this.state.fields.rbank);
   data.append('raddress',this.state.fields.raddress);
   data.append('amount',this.state.fields.amount);
   data.append('currency','USD');	

   data.append('invfile',this.state.InvFile);
   data.append('boefile',this.state.BOEFile);
   data.append('docfile',this.state.DocFile);

	let app = this;
	var url = 'http://'+ this.state.server +'/payment';
	fetch(url, {
    method: 'POST',	
    body: data}).
	then(function(response,error) {
		
		if(response)
		{
			app.setBalance();
			app.resetApp();
			return response.json();
		}
		else 
		{
			console.log(error);
		}
	}).then(function(data){
		console.log(data);
        app.setState({
		txstatus: data.result
        });
	});
    	
  }
	

resetApp = () => {
	this.setState({
		fields: {
				rname: null,	 
				rbank: null,
                raddress: null,
				raccount: null,
                amount: null
				       },
		InvFile: null,
		BOEFile: null,
		DocFile: null,
		InvFname: null,
		BOEFname: null,
		DocFname: null
	});
}


onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
    };

    componentDidMount(){
		
			}
							   
		
		 
						   
						   
    render() {
        
       
                return (
                    <div>
                        <Nav appName={this.appName} network={this.state.network} />
                        <Description name={this.state.name}/>
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                                   account={this.state.account}
								   balance={this.state.balance}
								   payment={this.payment}  
								   setBalance={this.setBalance} 	
								   fields={this.state.fields}
								   setAccount={this.setAccount}
								   txstatus={this.state.txstatus}
									Fname={this.state.Fname}
								   TabView={this.TabView}
									ViewFlag={this.state.ViewFlag}
									TransFlag={this.state.TransFlag}
									TransSet={this.TransSet}
									trans={this.state.trans}
									onChangeHandlerInv={this.onChangeHandlerInv}
									onChangeHandlerBOE={this.onChangeHandlerBOE}
									onChangeHandlerDoc={this.onChangeHandlerDoc}
									InvFname={this.state.InvFname}
					                BOEFname={this.state.BOEFname}
					                DocFname={this.state.DocFname}/>
								   
								                       </div>
                )
            
    }
}

export default App;