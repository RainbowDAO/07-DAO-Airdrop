<template>
  <div class="home rainbow-panel">
    <div class="rainbow-table-header">
      <div class="table-title">
        Release Records
      </div>
      <div class="right">
        <div class="search-box">
          <input type="text">
          <img class="icon" src="../assets/search.png" alt="">
        </div>
        <div class="rainbow-button" @click="isShowRelease=true">
          INITIATE
        </div>
      </div>
    </div>
    <div class="rainbow-single-list">
      <div class="list-header">
        <div class="item">
          ID
        </div>
        <div class="item">
          Withdrawal address
        </div>
        <div class="item">
          Withdrawal time
        </div>
        <div class="item">
          Withdrawal amount
        </div>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="(item,index) in releaseRecords" :key="index">
          <div class="id" style="width: 60px">
            {{ index }}
          </div>
          <div class="id" style="width: 300px">
            {{ item.user }}
          </div>
          <div class="id" style="width: 100px">
            {{ item.time }}
          </div>
          <div class="id" style="width: 160px">
            {{ item.amount }}
          </div>
        </div>
        <div class="no-data" v-show="releaseRecords.length==0">
          <img src="../assets/no-data.png" alt="">
        </div>
      </div>
    </div>
    <div class="rainbow-table-header">
      <div class="table-title">
        Receive Records

      </div>
      <div class="right">
        <div class="search-box">
          <input type="text">
          <img class="icon" src="../assets/search.png" alt="">
        </div>
        <div class="rainbow-button"  @click="isShowRelease=true">
          INITIATE
        </div>
      </div>
    </div>

    <div class="rainbow-single-list">
      <div class="list-header">
        <div class="item">
          ID
        </div>
        <div class="item">
          Receive address
        </div>
        <div class="item">
          Receive time
        </div>
        <div class="item">
          Receive amount
        </div>
      </div>
      <div class="list-content">
        <div class="list-item" v-for="(item,index) in  receiveRecords" :key="index">
          <div class="id" style="width: 60px">
            {{ index }}
          </div>
          <div class="id" style="width: 300px">
            {{ item.user }}
          </div>
          <div class="id" style="width: 100px">
            {{ item.time }}
          </div>
          <div class="id" style="width: 160px">
            {{ item.amount }}
          </div>
        </div>
        <div class="no-data" v-show="receiveRecords.length==0">
          <img src="../assets/no-data.png" alt="">
        </div>
      </div>
    </div>
    <div class="rainbow-dialog-box release-dialog" v-show="isShowRelease">
      <div class="mask" @click="isShowRelease=false"></div>
      <div class="rainbow-dialog">
        <div class="dialog-title">
          {{ releaseSelectIndex == 0 ? "Release" : "Receive" }}
        </div>
        <div class="step1 animate__animated animate__fadeIn" v-show="releaseStep==1">
          <div class="select-box">
            <div class="name">
              Token airdrop method
            </div>
            <select v-model="releaseSelectIndex" @change="getSelected">
              <option selected value="0"> Active release</option>
              <option value="1"> Passive receipt</option>
            </select>
          </div>
          <div class="input-box">
            <div class="name">
              Token contract address
            </div>
            <input type="text"  v-model="form._token">
          </div>
          <div class="input-box">
            <div class="name">
              Token Name
            </div>
            <input type="text">
          </div>
          <div class="input-box">
            <div class="name">
              Total Issuance
            </div>
            <input type="text">
          </div>
          <div class="input-box">
            <div class="name">
              Token Accuracy
            </div>
            <input type="text">
          </div>
          <div style="display: flex">

            <div style="margin-left: 10px" class="rainbow-button next-btn" @click="next">
              NEXT
            </div>
          </div>
        </div>
        <div class="step2 animate__animated animate__fadeIn" v-show="releaseStep==2">
          <p>Token Amount</p>
          <div class="number">
            100,000,000.00
          </div>
          <div class="address-list">
            <div class="item">
              <div class="address">
                Address
              </div>
              <div class="ratio">
                Ratio
              </div>
            </div>
            <div class="item" v-for="(i,index) in recipientList" :key="index">
              <div class="address">
                <input type="text" v-model="recipientList[index].address">
              </div>
              <div class="ratio">
                <input type="text" v-model="recipientList[index].ratio">
              </div>
            </div>
            <div class="item">
              <div class="rainbow-button add-btn" @click="addAddr">
                ADD
              </div>
            </div>
          </div>
          <div style="display: flex">
            <div class="rainbow-button next-btn" @click="releaseStep--">
              BACK
            </div>
            <div style="margin-left: 10px" class="rainbow-button next-btn" @click="handleAddAddr">
              NEXT
            </div>
          </div>
        </div>
        <div class="step3 animate__animated animate__fadeIn" v-show="releaseStep==3&&releaseSelectIndex==0">
          <div class="input-box">
            <div class="name">
              Airdrop Tokens
            </div>
            <input type="text" placeholder="ETH">
          </div>
          <div class="input-box">
            <div class="name">
              Total Airdrop
            </div>
            <input type="number" placeholder="1000">
          </div>
          <div class="input-box">
            <div class="name">
              Total number of address
            </div>
            <input type="number" placeholder="100">
          </div>
          <div class="input-box">
            <div class="name">
              Total credit limit
            </div>
            <input type="number" placeholder="100,000">
          </div>
          <div class="input-box">
            <div class="name">
              Service Fee
            </div>
            <input type="number" placeholder="$1">
          </div>
          <div class="rainbow-button next-btn" @click="create">
            COMPLETE
          </div>
        </div>
        <div class="step3 animate__animated animate__fadeIn" v-show="releaseStep==3&&releaseSelectIndex==1">
          <div class="time-box">
            <div class="name">
              Please set the airdrop time
            </div>
            <div class="value">
              <input type="text"> <span>Year</span>
              <input type="text"> <span>Month</span>
              <input type="text"> <span>Days</span>
            </div>
          </div>
          <div class="input-box">
            <div class="name">
              Unclaimed token address
            </div>
            <input type="text">
          </div>
          <div class="tip">
            During the airdrop time, the project party cannot perform any operations on the token, and the recipient can
            receive the token; after the airdrop time, the recipient cannot receive the token, and the token will be
            sent to the address of the unclaimed token (which can be the address of the project party)
          </div>
          <div style="display: flex">
            <div class="rainbow-button next-btn" @click="releaseStep--">
              BACK
            </div>
            <div style="margin-left: 10px" class="rainbow-button next-btn" @click="next">
              NEXT
            </div>
          </div>
        </div>
        <div class="step3 animate__animated animate__fadeIn" v-show="releaseStep==4&&releaseSelectIndex==1">
          <div class="input-box">
            <div class="name">
              Token contract address
            </div>
            <input type="text" placeholder="ETH">
          </div>
          <div class="input-box">
            <div class="name">
              Token Name
            </div>
            <input type="text" placeholder="ETH">
          </div>
          <div class="input-box">
            <div class="name">
              Total Issuance
            </div>
            <input type="number" placeholder="1000">
          </div>
          <div class="input-box">
            <div class="name">
              Token Accuracy
            </div>
            <input type="number" placeholder="100">
          </div>
          <div class="input-box">
            <div class="name">
              Available quantity
            </div>
            <input type="number" placeholder="100,000">
          </div>
          <div class="input-box">
            <div class="name">
              Pick up quantity
            </div>
            <input type="text" placeholder="Enter">
          </div>
          <div style="display: flex">
            <div class="rainbow-button next-btn" @click="releaseStep--">
              BACK
            </div>
            <div class="rainbow-button next-btn" @click="create">
              COMPLETE
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>


</template>
<script>
import moment from "moment";

import {mapGetters} from "vuex";
export default {
  name: "home",
  components: {},
  data() {
    return {
      releaseSelectIndex: 0,
      releaseStep: 1,
      vaultList: [{}],
      isShowRelease: false,
      recipientList: [{}],
      releaseRecords: [],
      receiveRecords: [],
      form:{}
    }
  },
  computed:{
    ...mapGetters([
      'isConnected',
      'account'
    ]),
  },
  watch:{
    isConnected(){
      this.getRegistry()
    }
  },
  created() {
    this.getRegistry()
  },
  methods: {
    handleAddAddr(){
      this.AirdropTokenSendToMany()
    },
    getUesr2(){
      this.$store.dispatch("airdropbyuser/getUesr","0x2D8d2142B95322deE274e63174E368e54389F716").then(usersArr=>{
        console.log(usersArr)
        usersArr.forEach(user=>{
          this.$store.dispatch("airdropbyuser/getreceived", {_addresses:user,addr:"0x2D8d2142B95322deE274e63174E368e54389F716"}).then(amount=>{
            this.recipientList.push({
              user,
              amount
            })
          })
        })
      })
      this.$store.dispatch("airdropbyuser/endtime","0x2D8d2142B95322deE274e63174E368e54389F716").then(time=>{
        let rTime =  moment( parseInt(time)*1000).format('MMMM Do YYYY, h:mm:ss a');
        this.$store.dispatch("airdropbyuser/getUesr","0x2D8d2142B95322deE274e63174E368e54389F716").then(usersArr=>{
          console.log(usersArr)
          usersArr.forEach(user=>{
            this.$store.dispatch("airdropbyuser/getreceived", {_addresses:user,addr:"0x2D8d2142B95322deE274e63174E368e54389F716"}).then(amount=>{
              this.recipientList.push({
                time:rTime,
                user,
                amount
              })
            })
          })
        })
      })

    },
    getuser(){
      this.$store.dispatch("airdrop/creattime","0xBFe7D4d162d5cDB6c7feFFAb29c0f4B3f760E74b").then(time=>{
        let rTime =  moment( parseInt(time)*1000).format('MMMM Do YYYY, h:mm:ss a');
        this.$store.dispatch("airdrop/getUesr","0xBFe7D4d162d5cDB6c7feFFAb29c0f4B3f760E74b").then(usersArr=>{
          console.log(usersArr)

          usersArr.forEach(user=>{
            this.$store.dispatch("airdrop/getreceived", {_addresses:user,addr:"0xBFe7D4d162d5cDB6c7feFFAb29c0f4B3f760E74b"}).then(amount=>{
              this.releaseRecords.push({
                time:rTime,
                user,
                amount
              })
            })
          })
        })
      })
    },
    getRegistry(){
      if(!this.isConnected){
        return
      }
        this.getuser()

      this.$store.dispatch("AirDropFactory/getRegistry",{}).then(res=>{
        this.getUesr2()
        res.forEach(item=>{
          console.log(item)
          // this.$store.dispatch("airdropbyuser/_amounts",item).then(res=>{
          //   console.log(res)
          // })

        })
      })
    },
    AirdropTokenSendToMany(){
      this.releaseStep++
      // return
      // this.$store.dispatch("airdrop/AirdropTokenSendToMany",{
      //   _addresses:["0x844BE1C5B2181BeBb54CD0164A91F35397f31c30","0xd300EC143bFE51D77C82900D5E2C92A4C9da7319"],
      //   amounts: [1000000,2000000],
      //   addr:"0xede13dE067bac624c391D12b2AF5F74fa922B6fA"
      // }).then(()=>{
      //   alert("success")
      //   this.getRegistry()
      //   this.releaseStep++
      //
      // }).catch(err=>{
      //   alert(err)
      // })
    },

    createAirDrop(){
      this.$store.dispatch("AirDropFactory/createAirDrop",{
        manager:this.form.manager,
        _token: this.form._token
      }).then(()=>{
        alert("success")
        this.isShowRelease=false
        this.getuser()

      }).catch(err=>{
        alert(err)
      })
    },
    getSelected() {

    },
    next() {
      this.releaseStep++
    },
    addAddr() {
      this.recipientList.push({})
    },
    create() {
      this.createAirDrop()
    }
  }
}
</script>

<style lang="scss" scoped>
.rainbow-dialog {
  width: 600px;
  .tip{
    opacity: 0.6;
    font-size: 14px;
    font-weight: 500;
    text-align: justify;
    color: #ff1f84;
    line-height: 24px;
    background: rgba(255,31,132,0.10);
    border-radius: 10px;
    padding: 10px;
    margin: 20px 0;
  }
  .time-box{
    .name{
      line-height: 30px;
    }
    .value{
      display: flex;
      align-items: center;
      input{
        width: 100px;
        height: 26px;
        padding: 0 10px;
        background: #f6f5fa;
        border: 1px solid #eaeaea;
        border-radius: 10px;
      }
      span{
        margin: 0 10px;
      }
    }

  }
  .address-list {
    .item {
      display: flex;
      padding: 10px 0;

      input {
        width: 100%;
        height: 50px;
        background: #f6f5fa;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        padding: 0 10px;
      }

      .address {
        width: 446px;
      }

      .ratio {
        margin-left: 10px;
        width: 184px;
      }

      .add-btn {
        width: 60px;
        height: 36px;
      }
    }
  }

  .next-btn {
    width: 160px;
    height: 40px;
    margin-top: 20px;
  }

  .input-box, .select-box {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    select, input {
      width: 300px !important;
    }
  }
}

.rainbow-table-header {
  display: flex;
  justify-content: space-between;

  .table-title {
    font-size: 34px;
    font-weight: 700;
    text-align: left;
    color: #333333;
    line-height: 80px;
  }

  .right {
    display: flex;
    align-items: center;

    .search-box {
      display: flex;
      align-items: center;

      input {
        width: 325px;
        height: 40px;
        background: #f6f5fa;
        border: 1px solid #eaeaea;
        border-radius: 10px;
        padding: 0 10px;
      }

      .icon {
        margin-left: -30px;
        width: 18px;
        height: 18px;
      }
    }

    .rainbow-button {
      width: 100px;
      height: 40px;
      margin-left: 20px;
    }
  }
}

</style>
