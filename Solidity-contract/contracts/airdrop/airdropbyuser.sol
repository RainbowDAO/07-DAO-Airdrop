// SPDX-License-Identifier: unlicensed

pragma solidity ^0.8.0;

import "../../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../lib/SafeMath.sol";
import "../lib/TransferHelper.sol";
import {Context} from "./airdrop.sol";




contract airdropbyuser is Context {
  using SafeMath for uint256;
  // using Address for address;
    address public admin;
    address public token;
    uint256 public endtime;
    uint256 public _amounts;
    struct userinfo{
        uint256  gettime;
        uint256  amounts;
    }
    address[] public user;
    mapping (address => uint256) private allowances;
    mapping (address => userinfo) private userallowances;
    event AdminChange(address indexed Admin, address indexed newAdmin);
    constructor(address manager,address _token,uint256 _time)  public {
        
        admin = manager;
        token = _token;
        endtime = _time;
    }
    
    modifier  _isOwner() {
        require(msg.sender == admin);
        _;
    }
    function changeOwner(address manager) external _isOwner {
        admin = manager;
        emit AdminChange(msg.sender,manager);
    }
    
    function AirdropTokenToManyEqual(address[] calldata _addresses, uint256 amount) external _isOwner returns(bool) {
        uint256 balance =IERC20(token).balanceOf(address (this));
        uint256 _amountSum = amount.mul(_addresses.length) + _amounts;
        require(_amountSum < balance);
    
        for (uint8 i; i < _addresses.length; i++) {
            allowances[_addresses[i]] = amount;
            user.push(_addresses[i]);
        }
        return true;
    }

    function AirdropTokenToMany(address[] calldata _addresses, uint256[] calldata amounts) external _isOwner returns(bool) {
        uint256 _amountSum = _amounts;
        uint256 balance =IERC20(token).balanceOf(address (this));
        for (uint8 i; i < amounts.length; i++) {
          _amountSum.add(amounts[i]);
        }
        require(_amountSum < balance);
    
        for (uint8 i; i < _addresses.length; i++){
            allowances[_addresses[i]] = amounts[i];
            user.push(_addresses[i]);
        } 
        return true; 
    }
    //  function AirdropTokenToManyEqual(address[] calldata _addresses, uint256 amount) internal _isOwner returns(bool) {
    //     uint256 balance =IERC20(token).balanceOf(address (this));
    //     uint256 _amountSum = amount.mul(_addresses.length);
    //     require(_amountSum < balance);
    
    //     for (uint8 i; i < _addresses.length; i++) {
    //         allowances[_addresses[i]] = amount;
    //     }
    //     return true;
    // }

    // function AirdropTokenToMany(address[] calldata _addresses, uint256[] calldata amounts) internal _isOwner returns(bool) {
    //     uint256 _amountSum;
    //     uint256 balance =IERC20(token).balanceOf(address (this));
    //     for (uint8 i; i < amounts.length; i++) {
    //       _amountSum.add(amounts[i]);
    //     }
    //     require(_amountSum < balance);
    
    //     for (uint8 i; i < _addresses.length; i++){
    //         allowances[_addresses[i]] = amounts[i];
    //     } 
    //     return true; 
    // }
    function gettoken() external returns(bool){
         require(block.timestamp < endtime);
         userallowances[msg.sender].amounts = allowances[msg.sender];
         TransferHelper.safeTransfer(token,msg.sender, allowances[msg.sender]);
         allowances[msg.sender] = 0;
         userallowances[msg.sender].gettime = block.timestamp;
         
         return true;
    }
    function getUesr() public view returns (address[] memory )
    {
        return user;
    }
    function gettokenbyOwner() external _isOwner returns(bool){
        require(block.timestamp > endtime);
        uint256 balance =IERC20(token).balanceOf(address (this));
         TransferHelper.safeTransfer(token,msg.sender, balance);
        
         return true;
    }
    function getreceived(address _addresses) external view returns (userinfo memory){
        
        return userallowances[_addresses] ;
        
    }
    function gettime(address _addresses) external view returns (uint256){
        
        return userallowances[_addresses].gettime ;
        
    }
    function getamount(address _addresses) external view returns (uint256){
        
        return userallowances[_addresses].amounts ;
        
    }
 
}