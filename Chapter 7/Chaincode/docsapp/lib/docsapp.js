/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class docsapp extends Contract {

	async addDocHash(ctx, PathHash, DocHash) {
        console.info('============= START : Register Document ===========');

        const document = {
            DocHash,
	   		PathHash,	
            docType: 'document'
             };

        await ctx.stub.putState(PathHash,Buffer.from(JSON.stringify(document)));

        console.info('============= END : Register Document ===========');
    }
	
	

	async addPathHash(ctx, Time, MTimeHash, TreeHash) {
        console.info('============= START : Register M Time Hash ===========');

        const TH = {
            Time,
	    	MTimeHash,	
			TreeHash,
            docType: 'TimeHash'
             };

        await ctx.stub.putState(Time,Buffer.from(JSON.stringify(TH)));

        console.info('============= END : Register Time Hash ===========');
    }


    async queryDocHash(ctx, PathHash) {
        const DocHashBytes = await ctx.stub.getState(PathHash); // get the document hash from chaincode state
        if (!DocHashBytes || DocHashBytes.length === 0) {
            throw new Error('Invalid ${PathHash}.Document not registered');
        }
        console.log(DocHashBytes.toString());
        return DocHashBytes.toString();
    }
	
	
	    async queryPathHash(ctx, Time) {
        const TimeHashBytes = await ctx.stub.getState(Time); // get the document hash from chaincode state
        if (!TimeHashBytes || TimeHashBytes.length === 0) {
            throw new Error('Invalid ${Time}. Time not registered');
        }
        console.log(TimeHashBytes.toString());
        return TimeHashBytes.toString();
    }
}

module.exports = docsapp;
