const { ethers } = require("hardhat");

async function manaPrice(account) {
    // Chainlink Mana/Eth price feed address: 0x82a44d92d6c329826dc557c5e1be6ebec5d5feb9
    const manaEthPriceFeed = await ethers.getContractAt(
        "AggregatorV3Interface",
        "0x82a44d92d6c329826dc557c5e1be6ebec5d5feb9",
        account
    );

    const price = (await manaEthPriceFeed.latestRoundData())[1];

    console.log(`The Mana/Eth price is: ${price.toString()}`);

    return price;
}

module.exports = { manaPrice };
