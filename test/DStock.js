const { assert } = require('chai');
var tokenSupply = 1000000;

const DStock = artifacts.require('./DStock.sol');
const DStockToken = artifacts.require('./DStockToken.sol');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract("DStock",([admin, creator, buyer])=>{
    let dstock;

    before(async () => {
      dstocktoken = await DStockToken.deployed()
      dstock = await DStock.deployed()
    });

    describe('deployment', async () => {
        it('deploys successfully', async () => {
          const address = await dstock.address
          assert.notEqual(address, 0x0)
          assert.notEqual(address, '')
          assert.notEqual(address, null)
          assert.notEqual(address, undefined)
        })
      })
      
    describe('tokens',async()=>{
        
        it("tokens minted succesfully", async()=>{
          let count = 1000000,price;
          count = await dstocktoken.totalSupply()
          price = await dstock.tokenPrice()
          assert.equal(count,tokenSupply,"1000000 tokens minted")
          assert.equal(price,1000000000000000,"token price is correct")
        })


        it("tokens purchased",async()=>{
          // tokens should be less than maximum token count
        let oldAuthorBalance,newAuthorBalance,oldTokenBuyer,newTokenBuyer,difference;
        
        const numberOfTokens = 5;
        
        assert.isBelow(numberOfTokens, tokenSupply, 'No. of tokens should be less than supply');

        oldAuthorBalance = await web3.eth.getBalance(buyer)
        oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)
        oldTokenBuyer = await dstocktoken.balanceOf(buyer)

        await dstock.buyTokens(numberOfTokens,{from:buyer, value: web3.utils.toWei('0.005', 'Ether')} )

        newAuthorBalance = await web3.eth.getBalance(buyer)
        newAuthorBalance = new web3.utils.BN(newAuthorBalance)
        difference = oldAuthorBalance - newAuthorBalance
        assert.isAbove(difference,5000000000000000,"Value should be deducted from buyer")// value includes transaction amount also
        
        newTokenBuyer = await dstocktoken.balanceOf(buyer)
        difference = newTokenBuyer - oldTokenBuyer
        assert.equal(difference,numberOfTokens,'token transfered')
      })
    })

    describe("uploading assets",async()=>{
        let result, assetCount
        const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    
        before(async () => {
          result = await dstock.uploadAsset(hash,'1', { from: creator })
          assetCount = await dstock.assetCount()
        })
        
        it("asset uploaded", async()=> {
            assert.equal(assetCount,1)
            assert.equal()
            const event = result.logs[0].args
            assert.equal(event.creator,creator,'Creator assigned correct')
            assert.equal(event.hash,hash,'Hash of the asset is correct')
            assert.equal()
        })
        it("list uploaded assets", async()=> {
            await dstock.uploadAsset(hash,'5', { from: creator })
            list = await dstock.showUploads({from: creator})
            assert.equal(list[0],0)
            assert.equal(list[1],1,'Uploaded assets found')
        })
    })
    //  buy assets
    //  list bought assets
    // describe("buying assets", async()=>{
    //     const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    
    //     before(async () => {
    //         await dstock.uploadAsset(hash,'5', { from: creator })
    //         await dstock.uploadAsset(hash,'1', { from: creator })
    //     })

    //     it("buy assets-list bought assets-transfer tokens",async()=>{
    //         await dstock.buyAsset('1',{from: buyer})
    //         list = await dstock.showAssets({from: buyer})
    //         assert.equal(list[0],1,'Asset purchased by buyer')
    //     })
    // })
})