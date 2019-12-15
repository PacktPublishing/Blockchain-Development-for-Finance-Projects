var express = require('express');
var app = express();
var multer = require('multer')

var bodyParser = require("body-parser");
var path = require('path');
const { Keccak } = require('sha3');
const { FileSystemWallet, Gateway } = require('fabric-network');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient('http://localhost:5002')
const pg = require('pg');
const conString = "postgres://bankb:bankb@localhost:5432/bankb";
const client = new pg.Client(conString);
client.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

var CurrTxID = 1;

app.use(function (req, res, next) {

// Website to connect to. * indicates 'all'
 res.setHeader('Access-Control-Allow-Origin', '*');

// Methods to allow access
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers to allow access
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Send cookies 
 res.setHeader('Access-Control-Allow-Credentials', true);

// Move on to the next layer
 next();
});


var server = app.listen(process.env.PORT || 8001, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
	
	});



const ccpPath = '/home/ishan/fabric-samples/bankchain/connection-bankb.json';





app.post('/customerinfo', function (request, response) {

//const userId = request.body.userId;
console.log(request.body);
var userId=request.body.userId;

client.query('SELECT name,address,account,balance from customers where user_id = $1', [userId], (error, results)=> {
if (error) {
      throw error
    }	
	
      if(results)
	  {
		  console.log(results.rows);
	  response.json({
        name: results.rows[0].name,
        address: results.rows[0].address,
        account: results.rows[0].account,
		balance: results.rows[0].balance 
      });
	  			  
      response.end();
			  
	  }});
});


var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, '/home/ishan/CorpRemApp/CorpRemApp/public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, 'BankB' + CurrTxID+'-'+file.fieldname+'.txt' )
    }
})


var upload = multer({ storage: storage })

var cpUpload = upload.fields([{ name: 'invfile', maxCount: 1 }, { name: 'boefile', maxCount: 1 }, { name: 'docfile', maxCount: 1 }])



app.post('/payment', cpUpload, function (request, response, next) {

var invpath = 	request.files.invfile[0].destination + request.files.invfile[0].filename;
var boepath = 	request.files.boefile[0].destination + request.files.boefile[0].filename;
var docpath = 	request.files.docfile[0].destination + request.files.docfile[0].filename;	

var hasharray = [];
iwrite(invpath).then(function(res,err){

	if(res)
	{

	hasharray[0] = res[0].hash ;
	iwrite(boepath).then(function(res,err){
	
	if(res)
	{

	hasharray[1] = res[0].hash ;
	iwrite(docpath).then(function(res,err){
	if(res)
	{

	hasharray[2] = res[0].hash ;
	
	var txID = 'BankB' + CurrTxID;
	
	console.log("Transaction ID",txID);	
	
		
	submitTrans(txID, request.body, hasharray).then(function(err,res){	 		
	
	if(err)
	{
		console.log(err);
		response.send(err);
	}
		
		var paramsBal = {amount : request.body.amount,
					  	account : request.body.saccount};
	      
		
		updateBal(paramsBal,function(res){
			console.log("Updated result",res);
			if(res)
			{
		
		var paramsTx = {txID : txID,
					  det : request.body,
					  hasharray: hasharray};
			
		insertTrans(paramsTx,function(res){
		  
		if(res)
		{
		console.log("Query submission",res);
		response.json({
        	result: res, 
      		});
	  
		CurrTxID++;			  
		console.log(CurrTxID);	
      	response.end();
		
    	}
		})		
}
		})	
	})
														
}
	
	})
}
})
	}})})



app.post('/gettrans', function (request, response) {

	const account = request.body.account;
	console.log(account);
	client.query('SELECT * FROM transactions WHERE saccount = $1 OR 	raccount = $1', [account], (error, results)=> {

if (error) {
      throw error
    }
		
	if(results)
	  {	
		  console.log(results);
	  response.json({
		tx: results.rows 
      });
	response.end();
	  }
	})
})
		


async function submitTrans ( txID, trans, hasharray) {
    	
		try {
			
		
		const wallet = new FileSystemWallet('/home/ishan/fabric-samples/bankchain/wallet-BankB');
		
		const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
		
		const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork('bkchannel');
		const contract = network.getContract('corprem');
		        await contract.submitTransaction('createTx',txID,trans.sname,trans.saccount,trans.sbank,trans.saddress,trans.rname,trans.raccount,trans.rbank,trans.raddress, trans.currency, trans.amount,hasharray[0],hasharray[1],hasharray[2]);
        console.log('Transaction has been submitted');        
		await gateway.disconnect();
		console.log("End of Transaction Submission");
		return;	
		}catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
		return 'Failed to submit transaction: ${error}';	
        process.exit(1);
    	}		
};


var insertTrans = function(trans,res) {

client.query('INSERT INTO transactions(transaction_id,sname, saccount,sbank, saddress, rname, raccount, rbank, raddress, amount, currency, invhash, boehash, dochash, transtype) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)', [trans.txID,trans.det.sname,trans.det.saccount,trans.det.sbank,trans.det.saddress,trans.det.rname,trans.det.raccount,trans.det.rbank,trans.det.raddress, trans.det.amount,trans.det.currency,trans.hasharray[0],trans.hasharray[1],trans.hasharray[2], 'Outgoing'], (error, results) => {
			
			if (error)
			{
				throw error;
			}	
			
			var msg = "Transaction successfully submitted"; 	
			console.log("Reached here",msg);			
	        return res(msg);
			
    	})
		}

	


async function iwrite (filepath) {
try
{
const results = await ipfs.addFromFs(filepath, { });

console.log(filepath);
console.log('results', results);

return results;
}catch (error) {
        console.error(`Failed to write: ${error}`);
    	}
}	



var updateBal = function(trans,res) {

client.query('SELECT balance from customers where account = $1', [trans.account], (error, results)=> {
	if (error) {
      throw error
    }	
	if(results)
	  {	  
	  var oldbal = results.rows[0].balance;
      var newbal = oldbal - trans.amount;  
      

	client.query('UPDATE customers set balance = $1 where account = $2', [newbal, trans.account], (error, results) => {
	
	if (error) {
      throw error
    }	
	
	return res(newbal);
	})
	 }
})
}
	
	
	
	

