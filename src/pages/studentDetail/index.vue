<template>
    <view style="padding-bottom:1rpx;background-color:#eee;">
        <view class="order-info">
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
            <view>1、申请订单</view>
            <view>2、待审核挑选</view>
            <view>3、获取订单</view>
        </view>
        <view class="order-detail">
            <view class="title"><text>基本资料</text></view>
            <view class="order-info">
                <ul>
                    <li>
                        <span>籍贯</span>：
                        <span>{{detail.tcJiguan}}</span>
                    </li>
                    <li>
                        <span>教龄</span>：
                        <span>{{detail.tcJl}}</span>
                    </li>
                    <li>
                        <span>年级</span>：
                        <span>{{tcNj}}</span>
                    </li>
                    <li>
                        <span>所在城市</span>：
                        <span>{{detail.tcCitys}}</span>
                    </li>
                    <li>
                        <span>具体专业</span>：
                        <span>{{detail.tcZhuanye}}</span>
                    </li>
                </ul>
            </view>
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
                prefix: "cd"
            });
            this.detail = detail.data.data;
            console.log(this.detail);
        }
    }
};
</script>
<style scoped>
.order-info {
    padding: 20rpx 24rpx 0;
    background-color: #fff;
    font-size: 28rpx;
}
.order-info .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10rpx;
    color: #767676;
}
.order-info .flex.bordertop {
    padding: 20rpx 0;
    margin: 0;
    border-top: 1px solid #eee;
}
.order-info .flex .icon {
    display: inline-block;
    margin-right: 10rpx;
}
.order-info .flex .icon.money {
    padding-left: 65rpx;
    background: url("../../../static/img/img-money.png") no-repeat left top;
    background-size: 30% 80%;
    color: #ffc851;
}
.order-info .flex .icon.address {
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
    /* background: url("../../../static/img/img-liucheng.png") no-repeat left top; */
    background: url("../../../static/img/img-liucheng.png") no-repeat left top;
    background-size: 100% 100%;
}
.process view {
    width: 33.333333%;
    text-align: center;
    font-size: 28rpx;
}
</style>
