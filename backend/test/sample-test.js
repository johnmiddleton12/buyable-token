const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("Greeter", function () {
    it("Should return the new greeting once it's changed", async function () {
        const Greeter = await ethers.getContractFactory("Greeter");
        const greeter = await Greeter.deploy("Hello, world!");
        await greeter.deployed();

        expect(await greeter.greet()).to.equal("Hello, world!");

        const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

        // wait until the transaction is mined
        await setGreetingTx.wait();

        expect(await greeter.greet()).to.equal("Hola, mundo!");
    });
});

describe("BuyableToken", function () {

    let buyableToken;
    let buyer;

    const amount = ethers.utils.parseEther(".01");

    const tokenAmount = ethers.utils.parseEther("1000");

    beforeEach(async function () {
        const BuyableToken = await ethers.getContractFactory("BuyableToken");

        buyableToken = await BuyableToken.deploy();

        [buyer] = await ethers.getSigners();

    });

    it("Should have given contract .01 eth", async function () {
        const buyTx = await buyableToken.buyToken({ value: amount });
        await buyTx.wait();
        const provider = waffle.provider;
        expect(await provider.getBalance(buyableToken.address)).to.equal(amount);
    });

    it("Should have been given 1000 tokens", async function () {
        const buyTx = await buyableToken.buyToken({ value: amount });
        await buyTx.wait();
        expect(await buyableToken.balanceOf(buyer.address)).to.equal(tokenAmount);
    });
}
);


