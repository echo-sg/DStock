pragma solidity ^0.5.16;

contract DStockToken {
    string  public name = "DStock Token";
    string  public symbol = "DST";
    string  public standard = "DStock Token v1.0";
    uint256 public totalSupply;
    address public admin;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor(uint256 _initialSupply) public {
        admin = msg.sender;
        balanceOf[admin] = _initialSupply;//this
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[admin] >= _value);

        balanceOf[admin] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(admin, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[admin][_spender] = _value;

        emit Approval(admin, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][admin]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][admin] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}