<template>
  <div class="vaults">
    <div class="vault-list">
      <div class="item" @click="chooseDao(item)" v-for="(item,index) in vaultList" :key="index">
        <div class="logo">
          <img :src="item.logo" alt="">
        </div>
        <div class="vault-info">
          <div class="name">
            {{item.name}}
          </div>
          <div class="members" v-if="item.balance">
            Deposits: {{ item.balance }}
          </div>
        </div>
      </div>
    </div>
    <div class="nodata" v-show="vaultList.length==0">
      No Data
    </div>
  </div>
</template>

<script>
export default {
  name: "vaultHome",
  props:["vaultList"],
  methods:{
    chooseDao(item){
      this.$emit("chooseDao",item)
    }
  }
}
</script>

<style lang="scss" scoped>
.vault-list{
  display: flex;
  flex-wrap: wrap;
  .item{
    margin: 20px ;
    display: flex;
    width: 252px;
    height: 80px;
    background: #f5f5f5;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
    cursor: pointer;
    .vault-info{
      padding-left: 10px;
      .name{
        font-weight: bold;
      }
      .members{
        color: #666;
      }
    }
    .logo{
      width: 50px;
      height: 50px;
      img{
        width: 100%;
      }
    }
  }
}
</style>
