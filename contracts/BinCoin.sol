pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BinCoin is ERC20 {
    address private owner;
    address issuer;
    uint16 private lottery;
    uint256 reward;
    uint256 price;
    uint256 stake;

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

    function issueLottery(uint16 _lottery, uint256 _reward, uint256 _price) public payable {
        require(reward == 0 && _reward > 0 && balanceOf(msg.sender) >= _reward);
        issuer = msg.sender;
        lottery = _lottery;
        reward = _reward;
        price = _price;
        stake = 0;
        _transfer(msg.sender, address(this), _reward);
    }

    function guessLottery(uint16 _lottery) public payable {
        require(balanceOf(msg.sender) >= price, "Not enougth token");
        _transfer(msg.sender, address(this), price);

        stake += price;

        if (_lottery == lottery) {
            _transfer(address(this), msg.sender, reward);
            _transfer(address(this), issuer, stake * 90000 / 100000);
            _transfer(address(this), owner, stake * 10000 / 100000 );
            issuer = address(0);
            lottery = 0;
            reward = 0;
            price = 0;
            stake = 0;
        }
    }

    function getReward() public view returns(uint256)  {
        return reward;
    }

    function getStake() public view returns(uint256)  {
        return stake;
    }
}