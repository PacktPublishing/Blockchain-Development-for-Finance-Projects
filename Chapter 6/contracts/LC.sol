pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "./LCMaster.sol";

contract LC {

 struct LoC {
        uint LCNo;
        address BuyerAcc;
        address SellerAcc;
        uint Amount;
		uint IniAmount;
        bytes2 Status;
        uint DOIssue;
        uint DOExpiry;
		bytes32 DocHash;    
    }
	
	LoC LCnew;
	
	
	
	LCMaster LCM;
	ERC20 public ERC20Interface;
	
	address bank;
	constructor (uint LCNum,address BAcc,address SAcc,uint Amt,uint DOI,uint DOE,address bankadd) public
	        {
			bank = bankadd;
			LCnew.LCNo = LCNum;
			LCnew.BuyerAcc = BAcc;
			LCnew.SellerAcc = SAcc;
			LCnew.Amount = Amt;
			LCnew.IniAmount = Amt;
			LCnew.Status = 'I' ; // I - Issued, S - Settled, P - Partially Settled
			LCnew.DOIssue = DOI;
			LCnew.DOExpiry = DOE;
			LCnew.DocHash = 0x0;
			LCM = LCMaster(msg.sender);
			ERC20Interface = ERC20(0x0357B7E560260945c62b99C002eFC4f5B149eC2a);
			}
		
		modifier onlyAuth {
        if (msg.sender!=bank && msg.sender!=LCnew.BuyerAcc && msg.sender!=LCnew.SellerAcc) revert();
         _;
         }
		 
		 modifier onlySeller {
        if (msg.sender!=LCnew.SellerAcc) revert();
         _;
         }
		 
		 event SettleLCSuccessful(
              uint LCNum,
              address SAcc,
			  uint Amt,
			  uint IAmt,
              bytes2 Stat,
              bytes32 DocH
    			);
				
		
    
			
    
function viewLCdetails() public onlyAuth view returns (uint, address, address, uint,uint, bytes2, uint, uint, bytes32)
{
       

return (			LCnew.LCNo,
                    LCnew.BuyerAcc,
					LCnew.SellerAcc,
                    LCnew.Amount,
					LCnew.IniAmount,
                    LCnew.Status,
					LCnew.DOIssue,
                    LCnew.DOExpiry,
					LCnew.DocHash
                    );
}


function settleLC(uint SettleAmt, bytes32 DocH) public onlySeller 
{


require(LCnew.DOExpiry >= now && now >= LCnew.DOIssue, "LC Expired or Invalid Date ofIssue");
require(SettleAmt > 0 && SettleAmt <= LCnew.Amount  , "Invalid Settlement Amount");

if(SettleAmt == LCnew.Amount )
{
LCnew.Amount = 0;
LCnew.Status = 'S';
LCnew.DocHash = DocH;
ERC20Interface.transfer(msg.sender, SettleAmt);

LCM.modifyLC(LCnew.LCNo,0,'S');

emit SettleLCSuccessful(LCnew.LCNo,
						LCnew.SellerAcc,
						LCnew.Amount,
						LCnew.IniAmount,
						LCnew.Status,
						LCnew.DocHash);

}

else 
{
LCnew.Amount = LCnew.Amount - SettleAmt;
LCnew.Status = 'P';
LCnew.DocHash = DocH;
   
ERC20Interface.transfer(msg.sender, SettleAmt);

LCM.modifyLC(LCnew.LCNo,LCnew.Amount,'P');

emit SettleLCSuccessful(LCnew.LCNo,
						LCnew.SellerAcc,
						LCnew.Amount,
						LCnew.IniAmount,
						LCnew.Status,
						LCnew.DocHash);
}
}
}
