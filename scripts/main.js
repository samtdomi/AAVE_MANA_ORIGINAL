const { getNamedAccounts } = require("hardhat");
const { getWeth, collateralAmount } = require("./getWeth");
const { getLendingPool } = require("./getLendingPool");
const { approveERC20 } = require("./approveERC20");
const { deposit } = require("./deposit");
const { getUserAccountData } = require("./getUserAccountData");
const { manaPrice } = require("./manaPrice");
const { borrowMana } = require("./borrowMana");
const { repayMana } = require("./repayMana");

async function main() {
    const { deployer } = await getNamedAccounts();

    // script: converts ETH to WETH
    await getWeth();

    // script: gets AAVE lendingPool Address
    const lendingPool = await getLendingPool(deployer);
    console.log(`AAVE LendingPool address is: ${lendingPool.address}`);

    // script: approves aave to inititate transaction AND deposits to AAVE lending pool
    // weth etherscan mainnet address: 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
    // uses weth address becasue that is the asset that will be spent in the deposit transaction
    const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
    await approveERC20(
        wethAddress,
        lendingPool.address,
        collateralAmount,
        deployer
    );
    await deposit(lendingPool, wethAddress, collateralAmount, deployer);

    // script: get the user account data
    let { availableBorrowsETH } = await getUserAccountData(
        lendingPool,
        deployer
    );

    // script: get the Mana/ETH conversion rate
    const ManaPrice = await manaPrice(deployer);
    // determine amount of Mana to borrow (70% of total) based off of availableETH to borrow
    // convert the amount to wei so that we can borrow on AAVE
    const amountManaBorrow = availableBorrowsETH * 0.7 * (1 / ManaPrice);
    const amountManaBorrowWei = ethers.utils.parseEther(
        amountManaBorrow.toString()
    );
    console.log(`You can borrow ${amountManaBorrow} MANA`);

    // script: Borrow Mana from AAVE Protocol
    const manaTokenAddress = "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942";
    await borrowMana(
        manaTokenAddress,
        lendingPool,
        amountManaBorrowWei,
        deployer
    );

    // script: updated account data after borrowing Mana
    await getUserAccountData(lendingPool, deployer);

    // script: repay MANA , approve AAVE to spend for us FIRST
    await approveERC20(
        manaTokenAddress,
        lendingPool.address,
        amountManaBorrowWei,
        deployer
    );
    await repayMana(
        lendingPool,
        manaTokenAddress,
        amountManaBorrowWei,
        deployer
    );

    // script: Final account data after Repayment
    await getUserAccountData(lendingPool, deployer);
}

// runs the function main()
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
