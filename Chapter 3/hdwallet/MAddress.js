
const bip39 = require('bip39')
const hdkey = require('hdkey')
const ethUtil = require('ethereumjs-util')
const ethTx = require('ethereumjs-tx')
const Web3 = require('web3');
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
	
	});

var pathid = 0;
const mnemonic = bip39.generateMnemonic(); //generates string

console.log(mnemonic);


app.get("/api/getMAddress", function(req,res){
	

var sendResponseObject={};
var address;

(async function main() {
	
	try {
        
		const seed  = await bip39.mnemonicToSeed(mnemonic)  
		console.log("Seed:",seed);
		const root = hdkey.fromMasterSeed(seed)
		const masterPrivateKey = root.privateKey.toString('hex');
		console.log("Master private Key:",masterPrivateKey);
		const masterPubKey = root.publicKey.toString('hex');
		console.log("Master Public Key: ",masterPubKey);
					var path = "m/44'/60'/0'/0/"+pathid;
		console.log("root: ", root);
		const addrNode = root.derive(path)
		console.log("path: ", path);

		const pubKey = ethUtil.privateToPublic(addrNode._privateKey)
		console.log("Pubkey as hex:",pubKey.toString('hex'));

		const addr = ethUtil.publicToAddress(pubKey).toString('hex');
		console.log("pubkey to Addr:",addr);

	   address = ethUtil.toChecksumAddress(addr);
		console.log("Address with Check sum:",address)
		
		sendResponseObject['MAddress']= address;
		console.log(sendResponseObject);
		console.log("sendResponseObject");
		let jsonString= JSON.stringify(sendResponseObject)
res.send(jsonString);	
		if(pathid < 100)
		{	
		pathid++;
		}
		else
		{
		pathid = 0;
		}	
}catch(error) {
	console.log(error);
			};
					 
})();				 




});
