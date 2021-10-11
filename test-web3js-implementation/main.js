window.addEventListener('load', function() {
		if (typeof web3 !== 'undefined') {
			document.getElementById('logooverlay').style.visibility='hidden';
			startApp(web3);
		} else {
		}
	})

	const abi = [
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "pairName",
                            "type": "string"
                        },
                        {
                            "internalType": "uint64",
                            "name": "expirationTimestamp",
                            "type": "uint64"
                        },
                        {
                            "internalType": "uint256",
                            "name": "collateralPerPair",
                            "type": "uint256"
                        },
                        {
                            "internalType": "bytes32",
                            "name": "priceIdentifier",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "contract ExpandedIERC20",
                            "name": "longToken",
                            "type": "address"
                        },
                        {
                            "internalType": "contract ExpandedIERC20",
                            "name": "shortToken",
                            "type": "address"
                        },
                        {
                            "internalType": "contract IERC20",
                            "name": "collateralToken",
                            "type": "address"
                        },
                        {
                            "internalType": "contract LongShortPairFinancialProductLibrary",
                            "name": "financialProductLibrary",
                            "type": "address"
                        },
                        {
                            "internalType": "bytes",
                            "name": "customAncillaryData",
                            "type": "bytes"
                        },
                        {
                            "internalType": "uint256",
                            "name": "prepaidProposerReward",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "optimisticOracleLivenessTime",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "optimisticOracleProposerBond",
                            "type": "uint256"
                        },
                        {
                            "internalType": "contract FinderInterface",
                            "name": "finder",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "timerAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct LongShortPair.ConstructorParams",
                    "name": "params",
                    "type": "tuple"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "caller",
                    "type": "address"
                }
            ],
            "name": "ContractExpired",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sponsor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "collateralReturned",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "longTokens",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "shortTokens",
                    "type": "uint256"
                }
            ],
            "name": "PositionSettled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sponsor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "collateralUsed",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokensMinted",
                    "type": "uint256"
                }
            ],
            "name": "TokensCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sponsor",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "collateralReturned",
                    "type": "uint256"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokensRedeemed",
                    "type": "uint256"
                }
            ],
            "name": "TokensRedeemed",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "collateralPerPair",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "collateralToken",
            "outputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "contractState",
            "outputs": [
                {
                    "internalType": "enum LongShortPair.ContractState",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokensToCreate",
                    "type": "uint256"
                }
            ],
            "name": "create",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "collateralUsed",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "customAncillaryData",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "expirationTimestamp",
            "outputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "expire",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "expiryPercentLong",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "expiryPrice",
            "outputs": [
                {
                    "internalType": "int256",
                    "name": "",
                    "type": "int256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "financialProductLibrary",
            "outputs": [
                {
                    "internalType": "contract LongShortPairFinancialProductLibrary",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "finder",
            "outputs": [
                {
                    "internalType": "contract FinderInterface",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getCurrentTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "sponsor",
                    "type": "address"
                }
            ],
            "name": "getPositionTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "longToken",
            "outputs": [
                {
                    "internalType": "contract ExpandedIERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "optimisticOracleLivenessTime",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "optimisticOracleProposerBond",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pairName",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "prepaidProposerReward",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "priceIdentifier",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokensToRedeem",
                    "type": "uint256"
                }
            ],
            "name": "redeem",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "collateralReturned",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "time",
                    "type": "uint256"
                }
            ],
            "name": "setCurrentTime",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "longTokensToRedeem",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "shortTokensToRedeem",
                    "type": "uint256"
                }
            ],
            "name": "settle",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "collateralReturned",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "shortToken",
            "outputs": [
                {
                    "internalType": "contract ExpandedIERC20",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "timerAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
    }]
	const contract_address = ''
	const writeValue = (elementId, value) => document.getElementById(elementId).textContent = value;
	const etherValue = web3.toWei(10, 'ether');
	var address = ''

	web3.version.getNetwork((err, netId) => {
	  switch (netId) {
		case "1":
		  console.log('This is mainnet')
		  break
		case "2":
		  console.log('This is the Ropsten test network.')
		  break
		case "3":
		  console.log('This is the Kovan test network.')
		  break
		case "4":
		  console.log('This is the Rinkeby test network.')
		  break
		case "5":
		  console.log('This is the Goerli test network.')
		  break
		default:
		  console.log('This is an unknown network.')
	  }
	})

	var account = web3.eth.accounts[0];
	var accountInterval = setInterval(function() {
	  if (web3.eth.accounts[0] !== account) {
		account = web3.eth.accounts[0];
		location.reload();
	  }
	}, 100);

	function startApp(web3) {
		const eth = new Eth(web3.currentProvider)
		const token = eth.contract(abi).at(contract_address);
	}

	const myContract = web3.eth.contract(abi).at(contract_address);
	const constantConst = setInterval(intervalFunction, 3000);

    function create (tokensToCreate) {
        const eth = new Eth(web3.currentProvider)
        const myContract = eth.contract(abi).at(contract_address);
        web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
        myContract.create(tokensToCreate, { from: account})
    }
    
    function redeem (tokensToRedeem) {
        const eth = new Eth(web3.currentProvider)
        const myContract = eth.contract(abi).at(contract_address);
        web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
        myContract.redeem(tokensToRedeem, { from: account})
    }

    function settle (longTokensToRedeem, shortTokensToRedeem) {
        const eth = new Eth(web3.currentProvider)
        const myContract = eth.contract(abi).at(contract_address);
        web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
        myContract.settle(longTokensToRedeem, shortTokensToRedeem, { from: account})
    }
    
    function expire () {
        const eth = new Eth(web3.currentProvider)
        const myContract = eth.contract(abi).at(contract_address);
        web3.eth.getAccounts(function(err, accounts) { console.log(accounts); address = accounts.toString(); })
        myContract.expire({ from: account})
    }