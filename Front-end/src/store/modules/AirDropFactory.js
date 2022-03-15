import getContract from '@/abi/index'

const state = {
    token: null,
    daoAddress: null
}
const mutations = {
    SET_DAOADDRESS(state, address) {
        state.daoAddress = address
    }
}

function judgeToken(rootState) {
    if (!state.token) state.token = getContract.getContractByName("AirDropFactory", rootState.app.web3)
}

const actions = {
    _USER_STD_REGISTRY_({rootState}, {param0, param1}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods._USER_STD_REGISTRY_(param0, param1).call().then(res => {
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
    fee({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.fee().call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    tokenaddress({rootState}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.tokenaddress().call().then(res => {
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
    changefee({rootState}, {_token, _fee}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.changefee(_token, _fee).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.changefee(_token, _fee).send({
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
    createAirDrop({rootState}, {manager, _token}) {
        manager = rootState.app.account
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.createAirDrop(manager, _token).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.createAirDrop(manager, _token).send({
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
    createAirDropByUser({rootState}, {manager, _token, _time}) {
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.createAirDropByUser(manager, _token, _time).estimateGas({
                from: rootState.app.account,
            }).then(gas => {
                state.token.methods.createAirDropByUser(manager, _token, _time).send({
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
    getRegistry({rootState}, {user}) {
        user = rootState.app.account
        judgeToken(rootState)
        return new Promise((resolve, reject) => {
            state.token.methods.getRegistry(user).call().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

