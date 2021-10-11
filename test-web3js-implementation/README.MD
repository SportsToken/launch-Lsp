# LSP Test web3js implementation

This is a very crude, simplified version of a UI for UMA's LSP smart contracts using web3js. The functions can be used as a framework to plug in official graphics

`main.js` contains UMA's LongShortPair.sol ABI as well as js functions to call the `create` `redeem` `settle` `expire` functions on the LSP smart contract

`index.html` contains simple input events to interact with web3js functions

## Installation

[Launch UMA LSP contract](https://github.com/UMAprotocol/launch-lsp)

Open `main.js` and input contract address into:

- `const contract_address = ''` on line 527

- `var address = ''` on line 530

Use the UI to send test transactions to the contract to create, redeem, settle, and expire. More documentation on UMA's LSP functions are available [in the UMA docs](https://docs.umaproject.org/synthetic-tokens/long-short-pair)