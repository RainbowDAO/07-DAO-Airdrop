import getContract from '@/abi/index'

function judgeToken(rootState,addr) {
    if (!state.token) state.token = getContract.getContractByContract('airdropbyuser', addr,rootState.app.web3)
}

const state = {};
const mutations = {};
const actions = {
    _amounts({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods._amounts().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
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
    endtime({rootState},addr) {
        judgeToken(rootState,addr)
        return new Promise((resolve, reject) => {
            state.token.methods.endtime().call().then(res => {
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
    user({rootState}, {param0}) {
        judgeToken(rootState)
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
    AirdropTokenToManyEqual({rootState}, {_addresses, amount}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.AirdropTokenToManyEqual(_addresses, amount).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.AirdropTokenToManyEqual(_addresses, amount).send({
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
    AirdropTokenToMany({rootState}, {_addresses, amounts}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.AirdropTokenToMany(_addresses, amounts).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.AirdropTokenToMany(_addresses, amounts).send({
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
    gettoken({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.gettoken().estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.gettoken().send({
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
    getUesr({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.getUesr().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    gettokenbyOwner({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.gettokenbyOwner().estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.gettokenbyOwner().send({
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
    getreceived({rootState}, {_addresses}) {
        judgeToken(rootState)
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
