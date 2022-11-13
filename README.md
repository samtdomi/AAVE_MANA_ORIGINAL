The goal of this project is to provide ETH as collateral to the AAVE lending pool protocol and borrow MANA against that collateral. In this scenario, we are anticipating Decentraland (MANA) to appreciate in value more than ETH thus giving us a profit when we repay it (the total amount of MANA will be greater upon repayment than at the time of borrow, giving us extra money after repayment)

Also, we will be receiving interest on the ETH as collateral.

I will be exposing myself to the tricky "approval" process that is required in DEFI - which approves a protocol or external address to initiate a transaction of my tokens.

1. Convert ETH to an ERC20 token to make it compatible with the AAVE protocl - AAVE protocol only works with ERC20 tokens.

2. get the most up to date AAVE lendingPool contract from AAVE lendingPoolAddresses contract. This way is the assured way to use the most updated lendingPool contract as the AAVE developers can make changes and upgrades to the contract

3. Deposit ETH as collateral, 0.15 ETH

-   approve AAVE lendingPool to initiate transaction on our behalf

4. Get the conversion rate of ETH to MANA
5. Determine how much MANA we can borrow based off of ETH collateral

6. Borrow MANA

7. Repay MANA

-   approve AAVE lendingPool to initiate transaction on our behalf
