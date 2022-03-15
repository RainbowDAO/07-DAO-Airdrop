import AirDropFactory from "./data/AirDropFactory.json"
import airdrop from "./data/airdrop.json"
import airdropbyuser from "./data/airdropbyuser.json"
import erc20 from "./data/erc20.json"
const CONTRACTS = {
    AirDropFactory:{address:"0xFC66Bc8A6D0554871352c33edf4BF01143922d13",abi:AirDropFactory},
    airdrop:{abi:airdrop},
    airdropbyuser:{abi:airdropbyuser},
    erc20:{abi:erc20},
};

function getContractByName(name, web3) {
    return new web3.eth.Contract(CONTRACTS[name].abi, CONTRACTS[name].address, {});
}

function getContractByContract(name, address, web3) {
    console.log(name, address, web3)
    return new web3.eth.Contract(CONTRACTS[name].abi, address, {});
}

function getContractAddress(name) {
    return CONTRACTS[name].address;
}

export default {
    CONTRACTS,
    getContractByName,
    getContractByContract,
    getContractAddress
};
