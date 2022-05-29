const {expect} =require("chai");



describe("Irshit contract",()=>{
    it("Deployment should assign the total supply of tokens to the owner", async ( )=>{
        const [owner]=await ethers.getSigners();

        console.log(
            "Signers object ",owner
        );

        const Token= await ethers.getContractFactory("Token");
        const hardhatToken= await Token.deploy();

        const ownerbalance= await hardhatToken.balanceOf(owner.address);

        console.log("Owner address : ",owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerbalance);
    })
})