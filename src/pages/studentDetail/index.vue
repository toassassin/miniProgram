<template>
    <view style="padding-bottom:1rpx;background-color:#eee;">
        <view class="order-resume">
            <view class="flex">
                <view>{{detail.dq}}{{detail.orderName}}请{{detail.grade}}{{detail.subjectId}}家教</view>
                <view>{{detail.time}}</view>
            </view>
            <view class="flex">
                <view><i class="icon money">{{detail.money}}</i></view>
                <view>{{detail.dq}}</view>
            </view>
            <view class="flex">
                <view></view>
                <view><text style="color: #e4393c;">{{detail.browsenu}}</text>人浏览&nbsp;已有<text style="color: #e4393c;">{{detail.yynum}}</text>人申请</view>
            </view>
            <view class="flex bordertop">
                <view><i class="icon address">授课地点：{{detail.xxDz}}</i></view>
                <view></view>
            </view>
        </view>
        <view class="process">
            <view class="step step-1">1、申请订单</view>
            <view class="step step-2">2、待审核挑选</view>
            <view>3、获取订单</view>
        </view>
        <view class="order-detail">
            <view class="title"><text>学员信息</text></view>
            <view class="order-info">
                <ul>
                    <li>
                        <span>订单编号</span>：
                        <span>{{detail.id}}</span>
                    </li>
                    <li>
                        <span>联系人</span>：
                        <span>{{detail.userName}}</span>
                    </li>
                    <li>
                        <span>求教科目</span>：
                        <span>{{detail.subjectId}}</span>
                    </li>
                    <li>
                        <span>学员性别</span>：
                        <span>{{detail.userSex}}</span>
                    </li>
                    <li>
                        <span>学员年级</span>：
                        <span>{{detail.grade}}</span>
                    </li>
                    <li>
                        <span>学员概况</span>：
                        <span>{{detail.userSituation}}</span>
                    </li>
                    <li>
                        <span style="width:auto;">授课次数</span>：
                        <span>每周{{detail.ots}}次,每次{{detail.oxs}}小时</span>
                    </li>
                    <li style="display:flex;justify-content:flex-start;">
                        <span style="width:auto;">可授课时间</span>：
                        <span style="flex:1;">{{detail.skTimes}}</span>
                    </li>
                </ul>
            </view>
        </view>
        <view class="order-detail" style="margin-bottom:90rpx;">
            <view class="title"><text>教员信息</text></view>
            <view class="order-info">
                <ul>
                    <li>
                        <span>性别</span>：
                        <span>{{detail.teacherSex}}</span>
                    </li>
                    <li>
                        <span>教学方式</span>：
                        <span>教员上门</span>
                    </li>
                    <li>
                        <span>老师类型</span>：
                        <span>{{detail.lsType}}</span>
                    </li>
                    <li>
                        <span>学员性别</span>：
                        <span>{{detail.userSex}}</span>
                    </li>
                    <li>
                        <span>其他要求</span>：
                        <span>{{detail.teacherInfo}}</span>
                    </li>
                </ul>
            </view>
        </view>
        <view class="yuyue">
          <navigator url="../webview/main">申请成为教员</navigator>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            detail: {},
            id: ""
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.getData();
    },
    methods: {
        async getData() {
            var detail = await this.$http.post("/latestOrder/getOrderDetail", {
                orderId: this.id,
                prefix: this.$store.state.prefix
            });
            this.detail = detail.data.data;
        }
    }
};
</script>
<style scoped>
.order-resume {
    padding: 20rpx 24rpx 0;
    background-color: #fff;
    font-size: 28rpx;
}
.order-resume .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
    color: #767676;
}
.order-resume .flex.bordertop {
    padding: 20rpx 0;
    margin: 0;
    border-top: 1px solid #eee;
}
.order-resume .flex .icon {
    display: inline-block;
    margin-right: 10rpx;
}
.order-resume .flex .icon.money {
    padding-left: 65rpx;
    background: url("../../../static/img/img-money.png") no-repeat left top;
    background-size: 30% 80%;
    color: #ffc851;
}
.order-resume .flex .icon.address {
    padding-left: 50rpx;
    background: url("../../../static/img/img-address.png") no-repeat left top;
    vertical-align: text-bottom;
}
.process {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20rpx 0;
    height: 88rpx;
    background-color: #fbfbfb;
    /*background: url("../../../static/img/img-lc.png") no-repeat left top;*/
    /*background-size: 100% 100%;*/
}
.process view {
    width: 33.333333%;
    text-align: center;
    font-size: 28rpx;
}
.process .step {
    position: relative;
    height: 100%;
    line-height: 88rpx;
}
.process .step-1 {
    background-color: #ffc851;
}
.process .step-1:after {
    position: absolute;
    display: block;
    content: "";
    top: 0;
    right: -40rpx;
    width: 0;
    height: 0;
    border-top: 44rpx solid #fbfbfb;
    border-right: 44rpx solid #fbfbfb;
    border-bottom: 44rpx solid #fbfbfb;
    border-left: 44rpx solid transparent;
}
.process .step-2:after {
    position: absolute;
    display: block;
    content: "";
    top: 10rpx;
    right: 0;
    width: 60rpx;
    height: 60rpx;
    border-top: 2rpx solid #ddd;
    border-right: 2rpx solid #ddd;
    border-bottom: 2rpx solid transparent;
    border-left: 2rpx solid transparent;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}
.order-detail {
    margin-bottom: 20rpx;
    padding: 20rpx 24rpx 20rpx 40rpx;
    background-color: #fff;
}
.order-detail .title {
    position: relative;
    font-size: 32rpx;
    color: #454545;
}
.order-detail .title:before {
    position: absolute;
    display: block;
    content: "";
    top: 10rpx;
    left: -16rpx;
    width: 6rpx;
    height: 30rpx;
    background-color: #ffc851;
}
.order-detail span:first-child {
    display: inline-block;
    width: 120rpx;
    text-align: justify;
    text-align-last: justify;
    color: #767676;
}
.order-info {
    padding-top: 20rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #404040;
}
.yuyue {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
}
.yuyue navigator {
    padding: 20rpx 0;
    background-color: #ffc851;
    text-align: center;
    font-size: 32rpx;
    color: #fff;
}
</style>
