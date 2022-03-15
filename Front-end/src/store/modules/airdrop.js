import getContract from '@/abi/index'

function judgeToken(rootState,addr) {
    if (!state.token) state.token = getContract.getContractByContract('airdrop', addr,rootState.app.web3)
}

const state = {};
const mutations = {};
const actions = {
    admin({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.admin().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    creattime({rootState},addr) {
        judgeToken(rootState,addr)
        return new Promise((resolve, reject) => {
            state.token.methods.creattime().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    token({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.token().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    user({rootState}, {param0,addr}) {
        judgeToken(rootState,addr)
        return new Promise((resolve, reject) => {
            state.token.methods.user(param0).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    changeOwner({rootState}, {manager}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.changeOwner(manager).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.changeOwner(manager).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    AirdropTokenSendToManyEqual({rootState}, {_addresses, amount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.AirdropTokenSendToManyEqual(_addresses, amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.AirdropTokenSendToManyEqual(_addresses, amount).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    AirdropTokenSendToMany({rootState}, {_addresses, amounts,addr}) {
        judgeToken(rootState,addr)
        return new Promise((resolve, reject) => {
            state.token.methods.AirdropTokenSendToMany(_addresses, amounts).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.AirdropTokenSendToMany(_addresses, amounts).send({
                    from: rootState.app.account,
                    gas: parseInt(gas * 1.2)
                }).then(res => {

                    resolve(res)
                })
            }).catch(err => {
                reject(err)
            })
        })
    },
    getUesr({rootState},addr) {
        judgeToken(rootState,addr)
        return new Promise((resolve, reject) => {
            state.token.methods.getUesr().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getreceived({rootState}, {_addresses,addr}) {
        judgeToken(rootState,addr)
        return new Promise((resolve, reject) => {
            state.token.methods.getreceived(_addresses).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
}
export default {
    namespaced: true,
    mutations,
    state,
    actions
}
