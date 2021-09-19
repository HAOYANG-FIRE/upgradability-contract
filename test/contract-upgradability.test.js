/* global describe it artifacts */

import _ from 'lodash'
import { web3 } from './helpers/w3'


const accounts = web3.eth.accounts

const MsProxy = artifacts.require('Proxy')
const MsgStore = artifacts.require('MsgStore')
const MultiMsgStore = artifacts.require('MultiMsgStore')

describe('Upgradable Constract example', async function() {
  
  it('should create and upgrade proxy', async function() {
   
    // to avoid timeout happened
    this.timeout(0);

    // deploys an instance of MsgStore
    const msgStore = await MsgStore.new()

    // deploys an instance of MsProxy
    let msProxy = await MsProxy.new()

    console.log("================== Set proxy to use contract v1 ==================")
    // sets proxy to use MsgStore
    await msProxy.upgradeTo(msgStore.address)

    // extends truffle object to include MsgStore's functions, 
    // which will now be executable via the proxy
    msProxy = _.extend(msProxy, MsgStore.at(msgStore.address))

    console.log("================== Testing functions of contract v1 ==================")
    // call the functions of MsgStore through proxy
    const result1 = await msProxy.store("This is MsgStore fuction")
    console.log("store function of MsgStore: " + result1.logs[0].args.returnMsg)

    const result2 = await msProxy.retrive()
    console.log("retrieve function of MsgStore: " + result2)

    const result3 = await msProxy.store("Well done!")
    console.log("store function of MsgStore: " + result3.logs[0].args.returnMsg)

    const result4 = await msProxy.retrive()
    console.log("retrieve function of MsgStore: " + result4)

    console.log("================== Upgrad the Constract to v2 ==================")
    // deploys a MultiMsgStore
    const multiMsgStore = await MultiMsgStore.new()

    // upgrades shrimpCoin's proxy to use MintableTokenDelegate
    await msProxy.upgradeTo(multiMsgStore.address)

    // extends truffle object to include MultiMsgStore functions
    msProxy = _.extend(msProxy, MultiMsgStore.at(multiMsgStore.address))

    console.log("================== Testing functions of contract v2 ==================")
    // 通过代理合约去调用MultiMsgStore合约中的方法!
    const receipt1 = await msProxy.store("This is MultiMsgStore fuction")
    const address1 = receipt1.logs[0].args.key
    console.log("store function of MultiMsgStore: " + "successfully stored")
    console.log("the stored message's address is : " + address1)

    const receipt2 = await msProxy.store("Well done")
    const address2 = receipt2.logs[0].args.key
    console.log("store function of MultiMsgStore: " + "successfully stored")
    console.log("the stored message's address is : " + address2)

    const receipt3 = await msProxy.retrive(address2)
    console.log("the message stored in address " + address2 + " is: " + receipt3)

    const receipt4 = await msProxy.retrive(address1)
    console.log("the message stored in address " + address1 + " is: " + receipt4)
    
  })
})
