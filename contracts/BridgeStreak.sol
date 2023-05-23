// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract BridgeStreak{
    address payable public owner;
    mapping(address=>uint)  locked;
       
  event Locked(
    address from,
    address to,
    uint amount
  
  );

  event Unlocked(
    address to,
    uint amount
  );

    constructor()
    {
        owner=payable(msg.sender);
    }
    
    receive() external payable {}

    function lock(uint amount)  internal {
        require(msg.sender == owner, "caller is not owner");
        payable(address(this)).transfer(amount);
        locked[msg.sender]+=amount;
    }

function send(address to) payable external{
  uint amount=msg.value;
  lock(amount);
  emit Locked(msg.sender,to,amount);
}

    function unlock(address addr) payable external{
      payable(addr).transfer(msg.value);
      locked[addr]-=msg.value;
      emit Unlocked(addr, msg.value);
    }
    
    function lockedBalance(address addr) external view returns (uint){
      return locked[addr];
    }
     function getBalance() external view returns (uint){
      return address(msg.sender).balance;
    }
   
   
}