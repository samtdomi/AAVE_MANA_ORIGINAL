const { ethers } = require("hardhat");

/**
 * @dev this function needs to be ran before any transaction in the main() function
 * @param spenderAddress is the address that will be approved to spend the amount
 * @param erc20Address is the token address of the ASSET that will be appeoved to be spent
 * @notice captures and calls the approve function of the IERC20 interface
 * @dev arguments will be passed in when called from the main() function
 */

async function approveERC20(erc20Address, spenderAddress, amount, account) {
    const iErc20 = await ethers.getContractAt("IERC20", erc20Address, account);

    await iErc20.approve(spenderAddress, amount);

    console.log(`AAVE Lending Pool is approved to inititate transaction!!`);
}

module.exports = {
    approveERC20,
};
