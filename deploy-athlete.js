//Testnet deploy on Kovan
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { getAbi, getAddress } = require("@uma/core");
const { parseFixed } = require("@ethersproject/bignumber");

// Web3 Contract Params
const lspCreatorAddress = "0x57EE47829369e2EF62fBb423648bec70d0366204"; // Mumbai address
const ancillaryData = "";
const proposerReward = 0;
const networkUrl = "https://rpc-mumbai.maticvigil.com";
const fs = require('fs');
const mnemonic = "off neither whip umbrella skill monitor wall cup style fatal device month";
const collateralToken = "0x8C086885624C5b823Cc6fcA7BFF54C454D6b5239";
const _fpl = 'RangeBond';
const _gasPrice = 50;
const _networkId = 80001;
const _collateralPerPair = 1 * 10**18;

const _upperBound = '12000000000000000000';
const _lowerBound = '4000000000000000000';
const _strikePrice = '5000';
const _basePercentage = '5';
// Athlete Params
const livenessTime = 7200;
const proposerBond = 7500;

async function deployAthlete( _synthName, _synthSymbol, _expirationTimestamp, _ancillaryData) {
  
  // See HDWalletProvider documentation: https://www.npmjs.com/package/@truffle/hdwallet-provider.
  const url = networkUrl;
  const hdwalletOptions = {
    mnemonic: {
      phrase: mnemonic,
    },
    providerOrUrl: url,
    addressIndex: 0, // Change this to use the nth account.
  };

  //#region web3-stuff
    // Initialize web3 with an HDWalletProvider if a mnemonic was provided. Otherwise, just give it the url.
    const web3 = new Web3(mnemonic ? new HDWalletProvider(hdwalletOptions) : url);
    const { toWei, utf8ToHex, padRight } = web3.utils;

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0)
      throw "No accounts. Must provide mnemonic or node must have unlocked accounts.";
    const account = accounts[0];
    const networkId = _networkId;

    // Grab collateral decimals.
    const collateral = new web3.eth.Contract(
      getAbi("IERC20Standard"),
      collateralToken
    );
    const decimals = (await collateral.methods.decimals().call()).toString();  
  //#endregion



  //#region LSP-Params

    // LSP parameters. Pass in arguments to customize these.
    

      // LSP parameters. Pass in arguments to customize these.
  const lspParams = {
    pairName: _synthName,
    expirationTimestamp: _expirationTimestamp, // Timestamp that the contract will expire at.
    collateralPerPair: _collateralPerPair,  // 18 point Decimal Format
    priceIdentifier: padRight(utf8ToHex("SPD"), 64), // Price identifier to use.
    longSynthName: `long_${_synthName}`,
    longSynthSymbol: `PUT-${_synthSymbol}`,
    shortSynthName: `short_${_synthName}`,
    shortSynthSymbol: `CALL-${_synthName}`,
    collateralToken: collateralToken, // Collateral token address.
    financialProductLibrary: _fpl,
    customAncillaryData: utf8ToHex(_ancillaryData), // Default to empty bytes array if no ancillary data is passed.
    prepaidProposerReward: proposerReward, // Default to 0 if no prepaid proposer reward is passed.
    optimisticOracleLivenessTime: livenessTime,
    optimisticOracleProposerBond: proposerBond
  };

    console.log("params:", lspParams);
    const lspCreator = new web3.eth.Contract(
      getAbi("LongShortPairCreator"),
      lspCreatorAddress
    );

  //#endregion

  //#region Transactions-Params
    // Transaction parameters
    const transactionOptions = {
      gas: 12000000, // 12MM is very high. Set this lower if you only have < 2 ETH or so in your wallet.
      gasPrice: _gasPrice * 1000000000, // gasprice arg * 1 GWEI
      from: account,
    };
  
    console.log("transaction options:", transactionOptions);
  
    // Simulate transaction to test before sending to the network.
    console.log("Simulating Deployment...");
    const address = await lspCreator.methods.createLongShortPair(lspParams).call(transactionOptions);
    console.log("Simulation successful. Expected Address:", address);
  
    // Since the simulated transaction succeeded, send the real one to the network.
    const { transactionHash } = await lspCreator.methods.createLongShortPair(lspParams).send(transactionOptions);
    console.log("Deployed in transaction:", transactionHash);
  //#endregion

  //#region FPL-Parameters
  
    // Set the FPL parameters.
    if (_fpl) {
      console.log("Setting FPL parameters...");
      // Set the deployed FPL address and lowerBound.
      console.log("fpl address:", _fpl);
      const fplName = _fpl + "LongShortPairFinancialProductLibrary";
      console.log("fpl name:", fplName);
      const deployedFPL = new web3.eth.Contract(getAbi(fplName), _fpl);
      const lowerBound = _lowerBound ? _lowerBound : _strikePrice;
      // Set parameters depending on FPL type.
      if (_fpl == 'BinaryOption' || _fpl == 'CappedYieldDollar' || _fpl == 'CoveredCall' || _fpl == 'SimpleSuccessToken') {
        const fplParams = [address, lowerBound];
        console.log("fpl params:", {
          address: fplParams[0],
          lowerBound: fplParams[1]
        });
        const { transactionHash } = await deployedFPL.methods.setLongShortPairParameters(...fplParams).send(transactionOptions);
        console.log("Financial product library parameters set in transaction:", transactionHash);
      }
      if (_fpl == 'RangeBond' || _fpl == 'Linear') {
        const upperBound = _upperBound;
        const fplParams = [address, upperBound, lowerBound];
        console.log("fpl params:", {
          address: fplParams[0],
          upperBound: fplParams[1],
          lowerBound: fplParams[2]
        });
        const { transactionHash } = await deployedFPL.methods.setLongShortPairParameters(...fplParams).send(transactionOptions);
        console.log("Financial product library parameters set in transaction:", transactionHash);
      }
      if (_fpl == 'SuccessToken') {
        const basePercentage = _basePercentage;
        const fplParams = [address, lowerBound, basePercentage];
        console.log("fpl params:", {
          address: fplParams[0],
          lowerBound: fplParams[1],
          basePercentage: fplParams[2]
        });
        const { transactionHash } = await deployedFPL.methods.setLongShortPairParameters(...fplParams).send(transactionOptions);
        console.log("Financial product library parameters set in transaction:", transactionHash);
      }
    }
  
  //#endregion

  process.exit(0);
}


// TODO: Log each file to a save
deployAthlete("Derrick Henry", "aDH", "1628623703", "0001 0001").catch(err => {
  console.error(err);
});