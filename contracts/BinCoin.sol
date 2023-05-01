pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BinCoin is ERC20 {
    address private owner;

    constructor(address _owner) ERC20("BinCoin", "BC") {
        owner = _owner;
        _mint(owner, 10 ** 27);
    }

    function mint(uint256 amount) public payable {
        require(msg.sender == owner && amount > 0);
        _mint(owner, amount);
    }

    function burn(uint256 amount) public payable {
        require(msg.sender == owner && amount > 0);
        _burn(owner, amount);
    }
}