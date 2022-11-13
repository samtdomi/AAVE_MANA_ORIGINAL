const { ethers, getNamedAccounts } = require("hardhat");

const collateralAmount = ethers.utils.parseEther("0.15");

async function getWeth() {
    const { deployer } = await getNamedAccounts();

    // weth etherscan mainnet address: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    const iWeth = await ethers.getContractAt(
        "Iweth",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        deployer
    );

    const wethTransaction = await iWeth.deposit({ value: collateralAmount });
    await wethTransaction.wait(1);

    const wethBalance = await iWeth.balanceOf(deployer);

    console.log(`New WETH Balance: ${wethBalance.toString()}`);
}

module.exports = {
    getWeth,
    collateralAmount,
};
