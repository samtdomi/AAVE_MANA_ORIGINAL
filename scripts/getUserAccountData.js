/**
 * @param lendingPool is the lendingPool contract not the address
 * @param account is the deployer, our account
 */

async function getUserAccountData(lendingPool, account) {
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
        await lendingPool.getUserAccountData(account);

    console.log(`Total ETH Collateral is: ${totalCollateralETH}`);
    console.log(`Total ETH Debt is: ${totalDebtETH}`);
    console.log(`Total ETH available to borrow: ${availableBorrowsETH}`);

    return { availableBorrowsETH, totalDebtETH };
}

module.exports = { getUserAccountData };
