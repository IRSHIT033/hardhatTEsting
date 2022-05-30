
const {expect} =require("chai");


/*
describe("Irshit contract",()=>{
    it("Deployment should assign the total supply of tokens to the owner", async ( )=>{
        const [owner]=await ethers.getSigners();

       
        const Token= await ethers.getContractFactory("Token");
        const hardhatToken= await Token.deploy();

        const ownerbalance= await hardhatToken.balanceOf(owner.address);


        expect(await hardhatToken.totalSupply()).to.equal(ownerbalance);
    })


    it("Should transfer token between accounts", async ( )=>{
        const [owner,address1,address2]=await ethers.getSigners();

     
        const Token= await ethers.getContractFactory("Token");
        const hardhatToken= await Token.deploy();

        //Transfer 10 tokens from owner to addr1

        await hardhatToken.transfer(address1.address,10);
        expect(await hardhatToken.balanceOf(address1.address)).to.equal(10);

        //Transfer 5 tokens from  address1 to address2
        await hardhatToken.connect(address1).transfer(address2.address,5);
        expect(await hardhatToken.balanceOf(address2.address)).to.equal(5)

   })

})
*/

describe("Irshit Contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let address1;
    let address2;
    let adds;

    beforeEach(async ()=>{
        Token = await ethers.getContractFactory("Token");
        [owner,address1,address2,...adds]=await  ethers.getSigners();
        hardhatToken= await Token.deploy();
    })

    describe("Deployment",()=>{
        it("should set the right owner",async ()=>{
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        it("Should assign the total supply of token to the owner",async ()=>{
            const ownerBalance=await hardhatToken.balanceOf(owner.address);
            expect(await  hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })

    describe("Transactions",()=>{
        it("Should transfer token between accounts" , async ()=>{
            await hardhatToken.transfer(address1.address,5);
            const address1Bal= await hardhatToken.balanceOf(address1.address);
            expect(address1Bal).to.equal(5);

            await hardhatToken.connect(address1).transfer(address2.address,5);
            const address2Bal=await hardhatToken.balanceOf(address2.address);
            expect(address2Bal).to.equal(5);
        });


        it("should fail if sender does not have enough tokens",async ()=>{
            const initialOwnerBal=await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(address1).transfer(owner.address,1)).to.be.revertedWith("Not enough token") 
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBal);
        })

       it("Should update balance after transfers", async function(){
           const initialOwnerBal=await hardhatToken.balanceOf(owner.address);
           await hardhatToken.transfer(address1.address,5);
           await hardhatToken.transfer(address2.address,10);
           const finalownerbalance= await hardhatToken.balanceOf(owner.address);
           expect(finalownerbalance).to.equal(initialOwnerBal-15);

           const addr1Bal=await hardhatToken.balanceOf(address1.address);
           expect(addr1Bal).to.equal(5);


           const addr2Bal=await hardhatToken.balanceOf(address2.address);
           expect(addr2Bal).to.equal(10);

              })

    })
})