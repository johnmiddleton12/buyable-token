// SPDX-License-Identifier: GPL-3.0
 
pragma solidity ^0.8.0;
 
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BuyableToken is ERC20 {

    address public owner;

    uint256 public cost = 1 ether / 100;

    constructor() ERC20("Buyable Token", "TESTTOKEN") {
        // _mint(msg.sender,1000*10**18);
        owner = msg.sender;
    }

    function buyToken() public virtual payable {
        require(msg.value >= cost, "not enough eth");
        _mint(msg.sender, 1000*10**18);
    }

    function setCost(uint256 newCost) public {
        require(msg.sender == owner);
        cost = newCost;
    }

}
