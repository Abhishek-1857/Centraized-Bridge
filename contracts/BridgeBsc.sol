// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./IERC20.sol";

/*
    Errors:
    -   E01: Unauthorised call, only owner of the contract allowed
    -   E02: Low Balance

*/

contract BridgeBsc is IERC20 {
    uint8 public decimals = 18;
    uint public totalSupply;
    address owner;
    string public name;
    string public symbol;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    event Burn(address to, uint amount);
    event Mint(address to, uint amount);

    constructor(string memory _name, string memory _symbol){
      name = _name;
      symbol = _symbol;
      owner = msg.sender;
    }

    function transfer(address _recipient, uint _amount) external returns (bool) {
        require(balanceOf[msg.sender] >= _amount, "E02");
        balanceOf[msg.sender] -= _amount;
        balanceOf[_recipient] += _amount;
        emit Transfer(msg.sender, _recipient, _amount);
        return true;
    }

    function approve(address _spender, uint _amount) external returns (bool) {
        allowance[msg.sender][_spender] = _amount;
        emit Approval(msg.sender, _spender, _amount);
        return true;
    }

    function transferFrom(
        address _sender,
        address _recipient,
        uint _amount
    ) external returns (bool) {
        require(balanceOf[msg.sender] >= _amount, "E02");
        allowance[_sender][msg.sender] -= _amount;
        balanceOf[_sender] -= _amount;
        balanceOf[_recipient] += _amount;
        emit Transfer(_sender, _recipient, _amount);
        return true;
    }

    function mint(address _to, uint _amount) external onlyOwner {
        balanceOf[_to] += _amount;
        totalSupply += _amount;
        emit Mint(_to, _amount);
    }

    function _burn(address _to, uint _amount) internal {
        require(balanceOf[msg.sender] >= _amount, "E02");
        balanceOf[msg.sender] -= _amount;
        totalSupply -= _amount;
        emit Burn(_to, _amount);
    }

    function send(address _to, uint _amount) external {
        require(balanceOf[msg.sender] >= _amount, "E02");
        _burn(_to, _amount);
    }

     function getBalance(address _account) external view returns (uint){
      return balanceOf[_account];
    }

    modifier onlyOwner {
        require(msg.sender == owner, "E01");
        _;
    }
}