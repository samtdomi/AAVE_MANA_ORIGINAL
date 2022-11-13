const { ethers } = require("hardhat");

/**
 * @param lendingPool is the lendingPool contract, not address
 * @param asset is the address of the asset being spent (weth address)
 * @param amount is the amount being spent
 * @param onBehalfOf is the address of the account owner of the funds
 */
async function deposit(lendingPool, asset, amount, onBehalfOf) {
    await lendingPool.deposit(asset, amount, onBehalfOf, 0);

    console.log(`Deposit Successful!`);
}

module.exports = { deposit };
