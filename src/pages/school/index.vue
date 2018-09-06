<template>
  <view class="school">
    <view class="school-box">
      <view class="school-item" :class="'school-item'+'-'+index" v-for="(item,index) in schoolList" @tap="switchbar(item.id)">{{item.schoolName}}</view>
    </view>
  </view>
</template>
<script>
  import { mapMutations } from "vuex";
  export default {
    data(){
      return{
        schoolList:[]
      }
    },
    onLoad(){
      this.getData();
    },
    methods:{
      ...mapMutations({
        schoolId:"SET_SCHOOLID"
      }),
      switchbar(arg){
        this.schoolId(arg);
        wx.switchTab({
          url:"../teacher/main"
        })
      },
      getData(){
        var that=this;
        var data={
          prefix:this.$store.state.prefix
        }
        this.$http.post("/hotUniversity/getHotUniversityList",data).then((res)=>{
          console.log(res.data);
          that.schoolList=res.data.data;
        })
      }
    }
  }
</script>
<style scoped>
  .school-box{
    padding: 60rpx 24rpx;

  }
  .school-box:after{
    display: block;
    content: '';
    clear: both;
  }
  .school-box view:nth-of-type(even){
    margin-left: 18rpx;
  }
  .school-item{
    float: left;
    margin-bottom: 60rpx;
    width: 341rpx;
    min-height: 120rpx;
    line-height: 120rpx;
    border-radius: 8rpx;
    text-align: center;
    color: #fff;
  }
  .school-item-0{
    background: url("../../../static/img/img-school1.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-1{
    background: url("../../../static/img/img-school2.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-2{
    background: url("../../../static/img/img-school3.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-3{
    background: url("../../../static/img/img-school4.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-4{
    background: url("../../../static/img/img-school5.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-5{
    background: url("../../../static/img/img-school6.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-6{
    background: url("../../../static/img/img-school1.png") no-repeat center center;
    background-size: cover;
  }
  .school-item-7{
    background: url("../../../static/img/img-school2.png") no-repeat center center;
    background-size: cover;
  }
</style>
