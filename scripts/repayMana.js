/**
 *
 * @param lendingPool is the lendingPool contract not address
 * @param manaTokenAddress is the MANA ERC20 Token address on ETH Mainnet
 * @param amount is the amount of MANA that we borrowed
 * @param account is the deployer, our account
 */

async function repayMana(lendingPool, manaTokenAddress, amount, account) {
    const repayAmountConfirmation = await lendingPool.repay(
        manaTokenAddress,
        amount,
        1,
        account
    );

    repayAmountConfirmation.wait(1);

    console.log(
        `You Have Successfully Repaid ${repayAmountConfirmation.toString()} MANA`
    );
}

module.exports = { repayMana };
