# Upgradability Smart Contract Example

Implement upgradability Smart contracts through proxy pattern.

## Contracts

### MsgStore.sol

Contract v1, only be able to store and retrieve one message.

### MultiMsgStore.sol

Contract v2, be able to store and retrieve multi message.

### MSProxy.sol

Proxy contract, be able to upgrade contract.

## Usage

### Setup

run `npm install -g truffle`

run `npm install`

### Compile

Recompile contracts and build artifacts.

```
$ npm run compile
```

### Test

You must unlock the account before running the test

```
$ npm test
```
# upgradability-contract
