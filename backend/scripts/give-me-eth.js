const hre = require("hardhat");
const { ethers, waffle } = require("hardhat");

async function main() {

    let provider = ethers.provider

    await provider.send("hardhat_setBalance", [
        "0xd06f77605F887dC382CF74c8de723E4b53D14a7c",
        "0x10000000000000000",
    ]);

    await provider.send("hardhat_mine", ["0x1"]);

    console.log("jp given eth");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
