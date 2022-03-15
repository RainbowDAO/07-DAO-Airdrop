import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from "./modules/app";
import daoFactory from "./modules/daoFactory";
import daoManage from "./modules/daoManage";
import vault from "./modules/vault";
import erc20 from "./modules/erc20";
import AirDropFactory from "./modules/AirDropFactory";
import airdrop from "./modules/airdrop";
import airdropbyuser from "./modules/airdropbyuser";
Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    app,
    daoFactory,
    daoManage,
    vault,
    erc20,
    AirDropFactory,
    airdrop,
    airdropbyuser
  }
})
