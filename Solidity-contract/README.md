# Documentation on how to run the project

## Contract introduction

- AirDropFactory: Users can create their own airdrop through factory contracts,displays a list of airdrop information,It's a collection of all the contracts.
- airdropbyuser:  It is used to save the basic information and types of airdrop and get airdrop。
- airdrop: It is used to save the basic information and types of airdrop.

## Dependencies

- Linux or Mac
- node ≥ 14

## Network & Contract

- Network Name: Rinkeby 
- RPC URL: [https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161](https://testnet.aurora.dev/)

### contract address

#### AirDropFactory

0xF60e5310b15B322BCd5420FCfC024409e0FE82FB

## Installing

```
git clone git@github.com:lawrenceAigo/08-ETHDenver2022-DAO-Airdrop.git
cd 08-ETHDenver2022-DAO-Airdro/Solidity-contract
npm install
```

**Note**: Only the Metamask wallet is available for this demo

## Deploy Contracts

Open a local node or complete the information in the `truffle-config.js` and add the mnemonic to the `secret`

```
npm install -g @truffle/hdwallet-provider
truffle compile && truffle migrate
```

You will deploy contracts

- AirDropFactory

## Create a AirDrop 

The creatAirDrop  in the AirDropFactory contract creates a AirDrop  of its own, amount,token.

```
createAirDrop() or createAirDropByUser()
```

