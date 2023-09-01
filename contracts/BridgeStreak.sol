// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*
    Errors:
    -   E01: Unauthorised call, only owner of the contract allowed
    -   E02: Low Balance

*/


contract BridgeStreak{
    address payable public owner;
    mapping(address => uint)  locked;
    mapping(address => uint) public balanceOf;

       
  event Locked(
    address from,
    address to,
    uint amount
  
  );

  event Unlocked(
    address to,
    uint amount
  );

    constructor() {
        owner = payable(msg.sender);
    }
    
    receive() external payable {}

    function _lock(uint _amount)  internal {
        payable(address(this)).transfer(_amount);
        locked[msg.sender] += _amount;
    }

    function send(address _to) payable external {
        uint amount_ = msg.value;
        _lock(amount_);
        emit Locked(msg.sender, _to, amount_);
    }

    function unlock(address _addr) onlyOwner payable external{
      require(locked[_addr] >= msg.value, "E02");
      payable(_addr).transfer(msg.value);
      locked[_addr] -= msg.value;
      emit Unlocked(_addr, msg.value);
    }
    
    function lockedBalance(address _addr) external view returns (uint){
      return locked[_addr];
    }
     function getBalance() external view returns (uint){
      return address(msg.sender).balance;
    }
   
   modifier onlyOwner {
        require(msg.sender == owner, "E01");
        _;
    }
   
}