const { getNamedAccounts, ethers } = require("hardhat");

async function getLendingPool(account) {
    const lendingPoolAddressesProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
        account
    );

    const lendingPoolAddress =
        await lendingPoolAddressesProvider.getLendingPool();

    const lendingPool = await ethers.getContractAt(
        "ILendingPool",
        lendingPoolAddress,
        account
    );

    return lendingPool;
}

module.exports = { getLendingPool };
