const DStockToken = artifacts.require("DStockToken");
const DStock = artifacts.require("DStock");

module.exports = function(deployer) {
  deployer.deploy(DStockToken, 1000000).then(function() {
    // Token price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(DStock, DStockToken.address, tokenPrice);
  });
};