/**
 * @param manaTokenAddress is the MANA ERC20 token address on ETH Mainnet
 * @param lendingPool is the lendingPool contract not the address
 * @param amount is the amountBorrowManaWei
 * @param account is the deployer, our account
 *  manaTokenAddress is the ETH mainnet address of the MANA ERC20 Token contract
 */

async function borrowMana(manaTokenAddress, lendingPool, amount, account) {
    // manaTokenAddress = "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942";

    const manaTransaction = await lendingPool.borrow(
        manaTokenAddress,
        amount,
        1,
        0,
        account
    );
    manaTransaction.wait(1);
    console.log(`You have successfully borrowed ${amount} of MANA`);
}

module.exports = { borrowMana };
