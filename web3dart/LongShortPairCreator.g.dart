import 'package:web3dart/web3dart.dart' as _i1;

final _contractAbi = _i1.ContractAbi.fromJson(
    '[{"inputs":[{"internalType":"contract FinderInterface","name":"_finder","type":"address"},{"internalType":"contract TokenFactory","name":"_tokenFactory","type":"address"},{"internalType":"address","name":"_timer","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"longShortPair","type":"address"},{"indexed":true,"internalType":"address","name":"deployerAddress","type":"address"},{"indexed":false,"internalType":"address","name":"longToken","type":"address"},{"indexed":false,"internalType":"address","name":"shortToken","type":"address"}],"name":"CreatedLongShortPair","type":"event"},{"inputs":[{"components":[{"internalType":"string","name":"pairName","type":"string"},{"internalType":"uint64","name":"expirationTimestamp","type":"uint64"},{"internalType":"uint256","name":"collateralPerPair","type":"uint256"},{"internalType":"bytes32","name":"priceIdentifier","type":"bytes32"},{"internalType":"string","name":"longSynthName","type":"string"},{"internalType":"string","name":"longSynthSymbol","type":"string"},{"internalType":"string","name":"shortSynthName","type":"string"},{"internalType":"string","name":"shortSynthSymbol","type":"string"},{"internalType":"contract IERC20Standard","name":"collateralToken","type":"address"},{"internalType":"contract LongShortPairFinancialProductLibrary","name":"financialProductLibrary","type":"address"},{"internalType":"bytes","name":"customAncillaryData","type":"bytes"},{"internalType":"uint256","name":"prepaidProposerReward","type":"uint256"},{"internalType":"uint256","name":"optimisticOracleLivenessTime","type":"uint256"},{"internalType":"uint256","name":"optimisticOracleProposerBond","type":"uint256"}],"internalType":"struct LongShortPairCreator.CreatorParams","name":"params","type":"tuple"}],"name":"createLongShortPair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finder","outputs":[{"internalType":"contract FinderInterface","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"time","type":"uint256"}],"name":"setCurrentTime","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"timerAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenFactory","outputs":[{"internalType":"contract TokenFactory","name":"","type":"address"}],"stateMutability":"view","type":"function"}]',
    'LongShortPairCreator');

class LongShortPairCreator extends _i1.GeneratedContract {
  LongShortPairCreator(
      {required _i1.EthereumAddress address,
      required _i1.Web3Client client,
      int? chainId})
      : super(_i1.DeployedContract(_contractAbi, address), client, chainId);

  Future<String> createLongShortPair(dynamic params,
      {required _i1.Credentials credentials,
      _i1.Transaction? transaction}) async {
    final function = self.abi.functions[1];
    assert(checkSignature(function, '08dda04f'));
    final params = [params];
    return write(credentials, transaction, function, params);
  }

  Future<_i1.EthereumAddress> finder({_i1.BlockNum? atBlock}) async {
    final function = self.abi.functions[2];
    assert(checkSignature(function, 'b9a3c84c'));
    final params = [];
    final response = await read(function, params, atBlock);
    return (response[0] as _i1.EthereumAddress);
  }

  Future<BigInt> getCurrentTime({_i1.BlockNum? atBlock}) async {
    final function = self.abi.functions[3];
    assert(checkSignature(function, '29cb924d'));
    final params = [];
    final response = await read(function, params, atBlock);
    return (response[0] as BigInt);
  }

  Future<String> setCurrentTime(BigInt time,
      {required _i1.Credentials credentials,
      _i1.Transaction? transaction}) async {
    final function = self.abi.functions[4];
    assert(checkSignature(function, '22f8e566'));
    final params = [time];
    return write(credentials, transaction, function, params);
  }

  Future<_i1.EthereumAddress> timerAddress({_i1.BlockNum? atBlock}) async {
    final function = self.abi.functions[5];
    assert(checkSignature(function, '1c39c38d'));
    final params = [];
    final response = await read(function, params, atBlock);
    return (response[0] as _i1.EthereumAddress);
  }

  Future<_i1.EthereumAddress> tokenFactory({_i1.BlockNum? atBlock}) async {
    final function = self.abi.functions[6];
    assert(checkSignature(function, 'e77772fe'));
    final params = [];
    final response = await read(function, params, atBlock);
    return (response[0] as _i1.EthereumAddress);
  }

  /// Returns a live stream of all CreatedLongShortPair events emitted by this contract.
  Stream<CreatedLongShortPair> createdLongShortPairEvents(
      {_i1.BlockNum? fromBlock, _i1.BlockNum? toBlock}) {
    final event = self.event('CreatedLongShortPair');
    final filter = _i1.FilterOptions.events(
        contract: self, event: event, fromBlock: fromBlock, toBlock: toBlock);
    return client.events(filter).map((_i1.FilterEvent result) {
      final decoded = event.decodeResults(result.topics!, result.data!);
      return CreatedLongShortPair(decoded);
    });
  }
}

class CreatedLongShortPair {
  CreatedLongShortPair(List<dynamic> response)
      : longShortPair = (response[0] as _i1.EthereumAddress),
        deployerAddress = (response[1] as _i1.EthereumAddress),
        longToken = (response[2] as _i1.EthereumAddress),
        shortToken = (response[3] as _i1.EthereumAddress);

  final _i1.EthereumAddress longShortPair;

  final _i1.EthereumAddress deployerAddress;

  final _i1.EthereumAddress longToken;

  final _i1.EthereumAddress shortToken;
}
