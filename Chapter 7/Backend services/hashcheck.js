var fs = require('fs');
var path = require('path');
const { Keccak } = require('sha3');
const { FileSystemWallet, Gateway } = require('fabric-network');
var express = require("express");
var bodyParser = require("body-parser");
var app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const ccpPath = '/home/ishan/fabric-samples/first-network/connection-org1.json';

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

var server = app.listen(process.env.PORT || 3600, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
	
	});


var walk = function(dir, done) {
  var results = [];
  	
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
			results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};


async function bWrite (pHash,dHash) {
    	
		try {
			
		
		const wallet = new FileSystemWallet('/home/ishan/fabric-samples/fabcar/javascript/wallet');
		
		const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
		
		const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork('mychannel');
		const contract = network.getContract('docsapp');
		await contract.submitTransaction('addDocHash',pHash,dHash);
        console.log("Transaction Doc has been submitted");
		await gateway.disconnect();

    	} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    	}
        };


async function pWrite(FTH,MTH) {
    	
		try {
		
		const wallet = new FileSystemWallet('/home/ishan/fabric-samples/fabcar/javascript/wallet');
		const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
		
		const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork('mychannel');
		const contract = network.getContract('docsapp');
		
		var today = new Date();
				
		var dateTime = Date.UTC(today.getFullYear(), today.getMonth()+1, today.getDate(), 
							today.getHours(),today.getMinutes(),today.getSeconds());
			
		await contract.submitTransaction('addPathHash',dateTime.toString(),MTH,FTH);
        console.log("Transaction PathHash has been submitted");
		
		console.log(dateTime);	
		await gateway.disconnect();
		return dateTime.toString();
    	} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    	}
		}



async function pRead (dateTime,ModTH,FileTH) {
    	
		try {
			
		
		const wallet = new FileSystemWallet('/home/ishan/fabric-samples/fabcar/javascript/wallet');
		
		const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
		
		const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork('mychannel');
		const contract = network.getContract('docsapp');
		const resultFT = await contract.evaluateTransaction('queryPathHash',dateTime);
			
		var MTH = resultFT.toString('ascii',14,78);
		var FTH = resultFT.toString('ascii',115,179);	
        console.log("Transaction has been evaluated");
				
		await gateway.disconnect();
		
		var result;
		
		if(MTH != ModTH || FTH != FileTH)
		{
			result = 'Tampered'
		}
		else	
		{
			result = 'Not Tampered'
		}	
		
		return result;	
    	} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
		return error;	
        process.exit(1);
    	}
		};


async function bRead (file,p,d) {
    	
		try {
			
		
		const wallet = new FileSystemWallet('/home/ishan/fabric-samples/fabcar/javascript/wallet');
		
		const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
		
		const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
		const network = await gateway.getNetwork('mychannel');
		const contract = network.getContract('docsapp');
		const result = await contract.evaluateTransaction('queryDocHash',p);
		
		const data = result.toString('ascii',12,76);	
        console.log(`Transaction has been evaluated, result is: ${result.toString('ascii',12,76)}`);
		var status;	
		if (data == d)
		{		
		console.log("File not tampered");	
		status = 'Not Tampered';	
		return status;
		}
		else
		{	
		console.log("File tampered");
		status= 'Tampered';
			
		return status;	
    	}	
			

    	} catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    	}
		};






app.post("/api/hashread", function(request , response){


var modtime = request.body.modtime;
var jsonString;	

var directory = request.body.DirPath;
var timestamp = [];
walk(directory,function(err,res){
	 if (res)
{
	var files = res;
	var counter = 1;
	 	
		files.forEach(function (file) {
				
		
		var hashPath = new Keccak(256);
		var stats =	fs.statSync(file);
			
		timestamp.push(stats.mtime);	
		hashPath.update(file);
		var p = hashPath.digest('hex');
		
		var CounterT = counter;
				
			if  ( CounterT == files.length)
			{
			        var FileTreeHash = new Keccak(256);
					
					FileTreeHash.update(files.toString());
					var FTH = FileTreeHash.digest('hex');
						
					var MTimeHash = new Keccak(256);
					MTimeHash.update(timestamp.toString());
					var MTH = MTimeHash.digest('hex');	
			        Pread(modtime, MTH, FTH).then(function(err,res){
	 				 if (res)
						{
								jsonString = JSON.stringify({result: res,files: files });
								response.send(jsonString);	
						}
					else
						{
								jsonString = JSON.stringify({result: err, files: files});
								response.send(jsonString);
						}	
})}
		counter++;
		})}})});		 
							  


app.post("/api/hashreadfile", function(request , response){
	
var directory = request.body.DirPath;
var files = request.body.files;
	
	
var responseObject = [];
var timestamp = [];
var jsonString;
var counter = 1;
	 	
		files.forEach(function (file) {		
		
		var hashFile = new Keccak(256);
		var hashPath = new Keccak(256);
		var stats =	fs.statSync(file);
			
		timestamp.push(stats.mtime);	
		hashPath.update(file);
		var p = hashPath.digest('hex');
		
		var s = fs.ReadStream(file);
		
		s.on('data', function(d) { hashFile.update(d);});
		
		var CounterT = counter;
		s.on('end', function() {
		var d = hashFile.digest('hex');
		
				
		Fread(file,p,d).then(function(res){	
		if(res)
		{
		
		
		responseObject.push({file: file, status: res});	
		
		if( responseObject.length == files.length)
		{
		jsonString = JSON.stringify({res: responseObject});
		response.send(jsonString);
		}
		}
		
        });
});	
		
		
						counter++;
});
	
				  
});

app.post("/api/hashwrite", function(request , response){

var directory = request.body.DirPath;
var timestamp = [];

var modtime;
var jsonString;	
	

walk(directory,function(err,res){
	 if (res)
{
	var files = res;
	var counter = 1;
	 	
		files.forEach(function (file) {
		
			
		var hashFile = new Keccak(256);
		var hashPath = new Keccak(256);
		var stats =	fs.statSync(file);
					
		timestamp.push(stats.mtime);	
		hashPath.update(file);
		var p = hashPath.digest('hex');
		
		var s = fs.ReadStream(file);
		
		s.on('data', function(d) { hashFile.update(d);});
		
		var CounterT = counter;
		s.on('end', function() {
		var d = hashFile.digest('hex');
		
		bwrite(p,d);	
		

		
		if  ( CounterT == files.length)
			{
				
					var FileTreeHash = new Keccak(256);
					
					FileTreeHash.update(files.toString());
					var FTH = FileTreeHash.digest('hex');
					
					var MTimeHash = new Keccak(256);
					MTimeHash.update(timestamp.toString());
					var MTH = MTimeHash.digest('hex');
					
	
					pwrite(FTH,MTH).then(function(modtime){
				 jsonString = JSON.stringify({files: files,MTH: MTH,FTH: FTH, modtime: modtime});
				response.send(jsonString);	
					});
			}
});
	
		
		
						counter++;
});

	
}				  
else
{
	console.log(err);
	jsonString = JSON.stringify({Error: err});
	response.send(jsonString);	
}
});


})


