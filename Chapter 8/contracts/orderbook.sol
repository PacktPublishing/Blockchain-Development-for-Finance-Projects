pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";


contract Orderbook {

 using SafeMath for uint;
 
struct Order
{
    uint Amount;
    uint Price;
    uint TimeStamp;
    address Trader;
    bytes2 Status;
}

Order[] Buys;
Order[] Sells;
ERC20 public ERC20Base;
ERC20 public ERC20Counter;
address owner;

modifier onlyOwner {
        if (msg.sender!=owner) revert();
         _;
         }
         

constructor (address Base,address Counter) public
{
ERC20Base = ERC20(Base);
ERC20Counter = ERC20(Counter);
owner = msg.sender;
}

event BuyAdded(
              uint indexed Order_No,
              uint Amt,
              uint Price,
              address trader
    );

event SellAdded(
              uint indexed Order_No,
              uint Amt,
              uint Price,
              address trader
    );

event TradeAdd(
              uint indexed Order_No,
              uint Amt,
              uint Price,
              address maker,
              address taker
    );
    
    
function addBuy(uint Amt, uint BuyPrice) public returns (uint) 
{
    
    ERC20Base.transferFrom(msg.sender, address(this),Amt.mul(BuyPrice));
    Buys.push(Order(Amt,BuyPrice,now,msg.sender,'A'));
    emit SellAdded(Buys.length,Amt,BuyPrice,msg.sender);
	return Buys.length;
}

function addSell(uint Amt, uint SellPrice) public returns (uint) 
{
    
    ERC20Counter.transferFrom(msg.sender, address(this),Amt);
    Sells.push(Order(Amt,SellPrice,now,msg.sender,'A'));
    emit BuyAdded(Sells.length,Amt,SellPrice,msg.sender);
	return Sells.length;
}


function viewLengthBuy() public view returns (uint) 
{
    return Buys.length;
}

function viewLengthSell() public view returns (uint) 
{
    return Sells.length;
}

function viewBuy(uint OrderNo) public view returns (uint,uint,uint, address) 
{
    return (	
                    Buys[OrderNo-1].Amount,
                    Buys[OrderNo-1].Price,
                    Buys[OrderNo-1].TimeStamp,
                    Buys[OrderNo-1].Trader
                    );
}

function viewSell(uint OrderNo) public view returns (uint,uint,uint,address) 
{
    return (	
                    Sells[OrderNo-1].Amount,
                    Sells[OrderNo-1].Price,
                    Sells[OrderNo-1].TimeStamp,
                    Sells[OrderNo-1].Trader
                    );
}

function trade(uint OrderNo, uint Amt, uint TradePrice, uint trade_type) public returns ( uint, uint , address)  
{
    
    // 1 is Buy trade , 2 is Sell Trade
    
    if (trade_type == 1 && Sells[OrderNo-1].Amount == Amt)
    {
        require(TradePrice >= Sells[OrderNo-1].Price, "Invalid Price");
        ERC20Base.transferFrom(msg.sender, Sells[OrderNo-1].Trader,Amt.mul(Sells[OrderNo-1].Price));
        Sells[OrderNo-1].Amount = 0;
        Sells[OrderNo-1].Status = 'T';
        ERC20Counter.transfer(msg.sender, Amt);
        emit TradeAdd(OrderNo, Amt, Sells[OrderNo-1].Price,Sells[OrderNo-1].Trader,msg.sender);
        return (	
                    OrderNo,
                    Amt,
                    msg.sender
                    );          
    }
    else if (trade_type == 1 && Sells[OrderNo-1].Amount > Amt)
    {
        ERC20Base.transferFrom(msg.sender, Sells[OrderNo-1].Trader,Amt.mul(Sells[OrderNo-1].Price));
        require(TradePrice >= Sells[OrderNo-1].Price, "Invalid Price");
        Sells[OrderNo-1].Amount = Sells[OrderNo-1].Amount - Amt;
        Sells[OrderNo-1].Status = 'A';
        ERC20Counter.transfer(msg.sender, Amt);
        emit TradeAdd(OrderNo, Amt, Sells[OrderNo-1].Price,Sells[OrderNo-1].Trader,msg.sender);
		return (	
                    OrderNo,
                    Amt,
                    msg.sender
                    );        
    }
    else if (trade_type == 2 && Buys[OrderNo-1].Amount == Amt)
    {
        ERC20Counter.transferFrom(msg.sender, Buys[OrderNo-1].Trader,Amt);
        Buys[OrderNo-1].Amount = 0;
        Buys[OrderNo-1].Status = 'T';
        ERC20Base.transfer(msg.sender, Amt.mul(Buys[OrderNo-1].Price));
        emit TradeAdd(OrderNo, Amt, Buys[OrderNo-1].Price,Buys[OrderNo-1].Trader,msg.sender);
		return (	
                    OrderNo,
                    Amt,
                    msg.sender
                    );        
    }
    else if (trade_type == 2 && Buys[OrderNo-1].Amount > Amt)
    {
        ERC20Counter.transferFrom(msg.sender, Buys[OrderNo-1].Trader,Amt);
        Buys[OrderNo-1].Amount = Buys[OrderNo-1].Amount - Amt;
        Buys[OrderNo-1].Status = 'A';
        ERC20Base.transfer(msg.sender, Amt.mul(Buys[OrderNo-1].Price));
        emit TradeAdd(OrderNo, Amt, Buys[OrderNo-1].Price,Buys[OrderNo-1].Trader,msg.sender);
		return (	
                    OrderNo,
                    Amt,
                    msg.sender
                    );        
    }
    else
    {
        revert("Invalid trade parameters"); 
    }
}
    
function decommission() public onlyOwner
{
    uint i = 0;
    while ( i <= Buys.length || i <= Sells.length)
    {
        if( i <= Buys.length)
        {
        uint Amt =  Buys[i].Amount;
        Amt = Amt.mul(Buys[i].Price);
        ERC20Base.transfer(Buys[i].Trader,Amt);
        delete Buys[i];
        }
        
        if( i <= Sells.length)
        {
        ERC20Counter.transfer(Sells[i].Trader,Sells[i].Amount);
        delete Sells[i];
        }
    i++;
        
    }

    
}
    
}
