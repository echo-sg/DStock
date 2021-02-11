pragma solidity ^0.5.16;

import "./DStockToken.sol";

contract DStock{
    
    address admin;
    DStockToken public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event TokenBought(address _buyer, uint256 _amount);
    event TokenRedeemed(address _buyer, uint256 _amount);

    uint256 public assetCount;
    uint8 public personCount;
    
    struct asset{
        uint256 assetId;
        string hash;
        address creatorAddress;
        uint256 cost;
        uint256 soldCount;
    }
    
    struct person{
        uint256 personId;
        address personAddress;
        uint256 earning;
        uint256 tokenCount;
        uint256[] assetsUploaded;
        uint256[] assetsBought;
        bool initialized;
    }
    
    mapping (uint256=> asset) public assets;
    mapping (uint256=> person) public persons;
    mapping (address=> uint8) public getMyId;
    
    event itemUploaded(address creator, string hash);
    event itemPurchased(string hash, uint256 cost);
    
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
        persons[personCount].assetsUploaded = new uint256[](0);
        persons[personCount].assetsBought = new uint256[](0);
    }
    

    function multiply(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x);
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == multiply(_numberOfTokens, tokenPrice));//should be equal ideally
        require(tokenContract.balanceOf(admin) >= _numberOfTokens);
        require(tokenContract.transfer(msg.sender, _numberOfTokens),"Token should be transfer to the buyer");
        initializePerson(msg.sender);

        tokensSold += _numberOfTokens;
        emit TokenBought(msg.sender, _numberOfTokens);
    }
    
    function redeemTokens(address payable _to, uint256 _numberOfTokens ) public{ //payable not used
        require(tokenContract.balanceOf(msg.sender) >= _numberOfTokens);
        require(tokenContract.transferFrom(msg.sender, admin, _numberOfTokens)); 
        _to.transfer(multiply(_numberOfTokens, tokenPrice));
        
        tokensSold -= _numberOfTokens;
        emit TokenRedeemed(msg.sender, _numberOfTokens);
    }
    
    
    function uploadAsset(string memory _hash, uint256 _cost) public {
        require(bytes(_hash).length > 0,"Hash cannot be empty");
        require(_cost != 0, "Cost cannot be 0");
        initializePerson(msg.sender);
        assets[assetCount] = asset(assetCount,_hash,msg.sender,_cost,0);
        persons[getMyId[msg.sender]].assetsUploaded.push(assetCount);
        assetCount++;
        emit itemUploaded(msg.sender,_hash);
    }
    
    function buyAsset(uint256 _assetId) public {
        require( _assetId>= 0 && _assetId < assetCount,"Asset count invalid");
        initializePerson(msg.sender);
        require(tokenContract.transferFrom(msg.sender, assets[_assetId].creatorAddress, assets[_assetId].cost));
        assets[_assetId].soldCount++;
        persons[getMyId[msg.sender]].assetsBought.push(_assetId);
        emit itemPurchased(assets[_assetId].hash , assets[_assetId].cost);
    }

    function showAssets() public view returns (uint256[] memory){
     return persons[getMyId[msg.sender]].assetsBought;   
    }
    
    function showUploads() public view returns (uint256[] memory){
     return persons[getMyId[msg.sender]].assetsUploaded;   
    }    
    
    function getId() public view returns (uint8){
     return getMyId[msg.sender];
    }

    // function getAsset() public view returns (uint8){
    //  return persons[getId()];
    // }

    function getPerson() public view returns(address a, uint b, uint c){
     return (persons[getMyId[msg.sender]].personAddress, persons[getMyId[msg.sender]].earning, persons[getMyId[msg.sender]].tokenCount);
    }
}