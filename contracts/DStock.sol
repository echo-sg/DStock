pragma solidity ^0.5.16;

import "./DStockToken.sol";

contract DStock{
    
    address admin;
    DStockToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event TokenBought(address _buyer, uint256 _amount);
    event TokenRedeemed(address _buyer, uint256 _amount);
    
    uint public assetCount;
    uint public personCount;
    
    struct asset{
        uint assetId;
        string hash;
        address creatorAddress;
        uint cost;
        uint soldCount;
    }
    
    struct person{
        uint personId;
        address personAddress;
        uint earning;
        uint tokenCount;
        uint[] assetsUploaded;
        uint[] assetsBought;
        bool initialized;
    }
    
    mapping (uint => asset) public assets;
    mapping (uint => person) public persons;
    mapping  (address=> uint) public  getMyId;
    
    event itemUploaded(address creator, string hash);
    event itemPurchased(string hash, uint cost);
    
    constructor(DStockToken _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function initializePerson(address _sender) private {
        if(persons[getMyId[_sender]].initialized == true) { return; }
        personCount++;
        getMyId[_sender] = personCount;
        persons[personCount].personId = personCount;
        persons[personCount].personAddress = _sender;
        persons[personCount].earning= 0;
        persons[personCount].tokenCount = 0 ;
        persons[personCount].initialized = true;
        persons[personCount].assetsUploaded = new uint[](0);
        persons[personCount].assetsBought = new uint[](0);
    }
    

    function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));
        require(tokenContract.balanceOf(admin) >= _numberOfTokens);
        // require(tokenContract.balanceOf(this) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens));
        initializePerson(msg.sender);

        tokensSold += _numberOfTokens;
        
        emit TokenBought(msg.sender, _numberOfTokens);
    }
    
    function redeemTokens(address payable _to, uint256 _numberOfTokens ) public{ //payable not used
        require(tokenContract.balanceOf(msg.sender) >= _numberOfTokens);
        require(tokenContract.transferFrom(msg.sender, admin, _numberOfTokens)); 
        initializePerson(msg.sender);
        _to.transfer(multiply(_numberOfTokens, tokenPrice));
        
        tokensSold -= _numberOfTokens;
        emit TokenRedeemed(msg.sender, _numberOfTokens);
    }
    
    
    function uploadAsset(string memory _hash, uint _cost) public {
        require(bytes(_hash).length > 0,"Hash cannot be empty");
        require(_cost != 0, "Cost cannot be 0");
        initializePerson(msg.sender);
        assets[assetCount] = asset(assetCount,_hash,msg.sender,_cost,0);
        persons[getMyId[msg.sender]].assetsUploaded.push(assetCount);
        assetCount++;
        emit itemUploaded(msg.sender,_hash);
    }
    
    function buyAsset(uint _assetId) public {
        require( _assetId>= 0 && _assetId < assetCount,"Asset count invalid");
        initializePerson(msg.sender);
        require(tokenContract.transferFrom(msg.sender, assets[_assetId].creatorAddress, assets[_assetId].cost));
        assets[_assetId].soldCount++;
        persons[getMyId[msg.sender]].assetsBought.push(_assetId);
        emit itemPurchased(assets[_assetId].hash , assets[_assetId].cost);
    }

    function showAssets() public view returns (uint[] memory){
     return persons[getMyId[msg.sender]].assetsBought;   
    }
    
    function showUploads() public view returns (uint[] memory){
     return persons[getMyId[msg.sender]].assetsUploaded;   
    }
}