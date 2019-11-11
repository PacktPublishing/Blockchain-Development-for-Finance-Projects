pragma solidity ^0.5.2;

import "./LC.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract LCMaster {
    
     
    
    struct LCData {
        uint LCNo;
        address BuyerAcc;
        address SellerAcc;
        uint Amount;
        bytes2 Status;
        uint DOIssue;
        uint DOExpiry;
		address LCAddress;
    }
    
    LCData[] LCDoc;
     
    address owner;
    
    ERC20 public ERC20Interface;
    
    event CreateLCSuccessful(
              uint LCNum,
              address SAcc,
              address BAcc,
              uint Amt,
              bytes2 Stat,
              uint DOI,
              uint DOE,
              address LCAdd
    );
    
    event ModifyLCSuccessful(
              uint LCNum,
              address SAcc,
              address BAcc,
              uint Amt,
              bytes2 Stat
    );
    
    
    constructor () public payable
    {
        owner=msg.sender;
	LCDoc.length = 1;
    }
    
    
    modifier onlyOwner {
        if (msg.sender!=owner) revert();
         _;
         }
    
    
    
    function createLC(address BAcc, address SAcc,uint Amt, uint DOE) public onlyOwner returns (uint)
{      
    LC newLC = new LC(LCDoc.length,BAcc,SAcc,Amt, now,DOE,owner);
	
	ERC20Interface = ERC20(0x0357B7E560260945c62b99C002eFC4f5B149eC2a);    
    
    ERC20Interface.transfer(address(newLC), Amt);
	
	LCDoc.push(LCData(LCDoc.length,BAcc,SAcc,Amt,'I', now ,DOE,address(newLC)));
	emit CreateLCSuccessful(LCDoc[LCDoc.length-1].LCNo,
                    LCDoc[LCDoc.length-1].SellerAcc,
                    LCDoc[LCDoc.length-1].BuyerAcc,
                    LCDoc[LCDoc.length-1].Amount,
                    LCDoc[LCDoc.length-1].Status,
                    LCDoc[LCDoc.length-1].DOIssue,
                    LCDoc[LCDoc.length-1].DOExpiry,
                    LCDoc[LCDoc.length-1].LCAddress);
                    
    return LCDoc[LCDoc.length-1].LCNo;
}




function lengthLC() public view returns (uint)
{
	return LCDoc.length;
}	


function viewLC(uint viewLCNo) public view returns (address, address, uint, bytes2, uint, uint, address)
{
    if(msg.sender == owner || msg.sender == LCDoc[viewLCNo].SellerAcc || msg.sender == LCDoc[viewLCNo].BuyerAcc)
    
{    

return (			
                    LCDoc[viewLCNo].SellerAcc,
                    LCDoc[viewLCNo].BuyerAcc,
                    LCDoc[viewLCNo].Amount,
                    LCDoc[viewLCNo].Status,
					LCDoc[viewLCNo].DOIssue,
                    LCDoc[viewLCNo].DOExpiry,
                    LCDoc[viewLCNo].LCAddress
                    );
}
}


function modifyLC(uint LCNum, uint SettleAmt, bytes2 Stat) public 
    {
     LCData memory Temp;
     Temp = LCDoc[LCNum];
     Temp.Status = Stat;
     Temp.Amount = SettleAmt;
     delete LCDoc[LCNum];
     LCDoc[LCNum] = Temp; 
    
    
    
    emit ModifyLCSuccessful(LCDoc[LCNum].LCNo,
                    LCDoc[LCNum].SellerAcc,
                    LCDoc[LCNum].BuyerAcc,
                    LCDoc[LCNum].Amount,
                    LCDoc[LCNum].Status);
                    
    }
    
    }


