// SPDX-License-Identifier: unlicensed

pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../lib/SafeMath.sol";
import "../lib/TransferHelper.sol";

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}


contract airdrop is Context {
  using SafeMath for uint256;
  // using Address for address;
    address public admin;
    uint256 public creattime;
    address public token;
    address[] public user;
    mapping (address => uint256) private allowances;
    event AdminChange(address indexed Admin, address indexed newAdmin);
    constructor(address manager, address _token)  public {
        
        admin = manager;
        token = _token;
    }
    
    modifier  _isOwner() {
        require(msg.sender == admin);
        _;
    }
    function changeOwner(address manager) external _isOwner {
        admin = manager;
        emit AdminChange(msg.sender,manager);
    }
    
    function AirdropTokenSendToManyEqual(address[] calldata _addresses, uint256 amount) external _isOwner returns(bool) {
        uint256 balance =IERC20(token).balanceOf(address (this));
        uint256 _amountSum = amount.mul(_addresses.length);
        require(_amountSum < balance);
        creattime = block.timestamp;
        for (uint8 i; i < _addresses.length; i++) {
            TransferHelper.safeTransfer(token,_addresses[i], amount);
            user.push(_addresses[i]);
            allowances[_addresses[i]] = amount;
        }
        return true;
    }

    function AirdropTokenSendToMany(address[] calldata _addresses, uint256[] calldata amounts) external _isOwner returns(bool) {
        uint256 _amountSum;
        uint256 balance =IERC20(token).balanceOf(address (this));
        for (uint8 i; i < amounts.length; i++) {
          _amountSum.add(amounts[i]);
        }
        require(_amountSum < balance);
        creattime = block.timestamp;
        for (uint8 i; i < _addresses.length; i++){
            TransferHelper.safeTransfer(token,_addresses[i], amounts[i]);
            user.push(_addresses[i]);
            allowances[_addresses[i]] = amounts[i];
        } 
        return true; 
    }
    function getUesr() public view returns (address[] memory )
    {
        return user;
    }


    function getreceived(address _addresses) external view returns (uint256){
        
        return allowances[_addresses] ;
        
    }
 
}