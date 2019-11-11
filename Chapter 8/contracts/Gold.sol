pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol"; 
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract Gold is ERC20Detailed, ERC20Capped, Ownable {

constructor() 
ERC20Detailed("Gold", "Au", 2) 
ERC20Capped(10000000000)
MinterRole()
payable public {}

}
