/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class corprem extends Contract {
	
	
	
async createTx(ctx, txid, 
		Sname, 
		Saccount,
		Sbank, 
		Saddr,
		Rname, 
		Raccount,
		Rbank, 
		Raddress, 
		curr, 
		amt, 
		InvHash, 
		BOEHash,  
		DocHash ) {
        console.info('============= START : Create Transaction ===========');
		
		
		
        const transaction = {
		txid,	
		Sname, 
		Saccount,
		Sbank, 
		Saddr,
		Rname, 
		Raccount,
		Rbank, 
		Raddress, 
		curr, 
		amt, 
		InvHash, 
		BOEHash,  
		DocHash,
		DocType: 'transaction'	
        };

        await ctx.stub.putState(txid, Buffer.from(JSON.stringify(transaction)));
        console.info('============= END : Create Transaction ===========');
	
    	ctx.stub.setEvent('txCreated', Buffer.from(JSON.stringify(transaction)));
	}

	



    async queryTx (ctx, txid) {
        const transaction = await ctx.stub.getState(txid); // get the transaction from chaincode state
        if (!transaction || transaction.length === 0) {
            throw new Error(`Transaction does not exist`);
        }
        console.log(transaction.toString());
        return transaction.toString();
    }
}
	

module.exports = corprem;
