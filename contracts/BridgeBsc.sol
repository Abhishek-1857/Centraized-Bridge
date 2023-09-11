// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IERC20.sol";

contract BridgeBsc is IERC20 {
    address public owner;
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals;


    constructor(string memory _name,string memory _symbol,uint8 _decimals){
        name=_name;
        symbol =_symbol;
        decimals=_decimals;
        owner=msg.sender;
    }

    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(uint amount) external {
        totalSupply += amount;
        emit Mint(amount);
    }

    function burn(uint amount) external {
        totalSupply -= amount;
        emit Burn(amount);
    }

    function mintWrapped(address from,address to,uint amount) external returns(bool){
        require(amount>0,"E1");
        balanceOf[to]+=amount;
        emit MintWrappedStreak(from, to, amount);
        return true;
    }

     function burnWrapped(address to,uint amount) external returns(bool){
        require(amount>0,"E2");
        require(balanceOf[msg.sender]>=amount,"E3");
        balanceOf[msg.sender]-=amount;
        emit BurnWrappedStreak(msg.sender, to, amount);
        return true;
    }
}
