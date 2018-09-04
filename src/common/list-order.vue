<template>
    <view class="list-item-r" style="margin-bottom:20rpx;">
        <navigator :url="'../studentDetail/main?id='+data.id" class="order-list" hover-class="weui-cell_active">
            <view>
                <view>
                    <text class="grade-subject">{{data.grade}}{{data.subjectId}}</text>
                    <text class="money">{{data.money}}</text>
                </view>
                <view class="order-disc">
                    <text class="area">{{data.dq}}</text>
                    <text class="time">{{data.time}}</text>
                </view>
                <view class="order-disc">
                    <text>{{data.teacherInfo}}</text>
                </view>
            </view>
            <view class="weui-cells_after-title order-name">
                <view class="weui-cell">
                    <view class="weui-cell__bd">
                        <i class="icon"></i>
                        <text class="student-name">{{data.userName}}</text>
                        <text class="order-status complete" v-if="data.status=='新发布'">新发布</text>
                        <text class="order-status complete" v-if="data.status=='已安排'">已安排</text>
                        <text class="order-status complete" v-if="data.status=='已完成'">已完成</text>
                    </view>
                    <view class="weui-cell__ft  weui-cell__ft_in-access"></view>
                </view>
            </view>
        </navigator>
    </view>
</template>
<script>
export default {
    props: ["data"]
};
</script>
<style scoped>
.grade-subject {
    font-size: 36rpx;
    font-weight: bold;
    color: #404040;
}
.money {
    float: right;
    font-size: 32rpx;
    color: #ffc851;
}
.order-disc text {
    position: relative;
    display: inline-block;
    line-height: 1;
    padding-right: 20rpx;
    font-size: 28rpx;
    color: #767676;
}
.order-disc text.time {
    padding-left: 20rpx;
}
.order-disc text.area:after {
    display: block;
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 2rpx;
    height: 30rpx;
    background-color: #cecece;
}
.list-item-r {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
}
.list-item-r .order-list {
    padding: 0 24rpx;
}
.order-name {
    border-top: 1rpx solid #f3f3f3;
}
.order-name view {
    padding: 5rpx 0;
}
.order-name .icon {
    display: inline-block;
    padding: 0;
    width: 43rpx;
    height: 50rpx;
    margin-right: 10rpx;
    background: url("../../static/img/img-name.png") no-repeat center;
    background-size: cover;
    vertical-align: text-bottom;
}
.list-item-r navigator {
    padding: 20rpx 24rpx 0;
}
.student-name {
    margin-right: 20rpx;
    font-size: 32rpx;
    color: #404040;
}
.order-status {
    position: relative;
    top: -4rpx;
    display: inline-block;
    padding: 0 10rpx;
    font-size: 24rpx;
    color: #fff;
}
.order-status.complete {
    background-color: #83ccff;
}
</style>
