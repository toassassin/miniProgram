<template>
    <view class="list-item-r">
        <navigator url="" hover-class="weui-cell_active">
            <view>
                <view>
                    <text class="grade-subject">初二英语</text>
                    <text class="money">180元/次</text>
                </view>
                <view class="order-disc">
                    <text class="area">海珠区</text>
                    <text class="time">2018-01-25</text>
                </view>
                <view class="order-disc">
                    <text>有家教经验</text>
                </view>
            </view>
            <view class="weui-cells_after-title order-name">
                <view class="weui-cell">
                    <view class="weui-cell__bd">
                        <i class="icon"></i>
                        <text class="student-name">陆小姐</text>
                        <text class="order-status complete">已完成</text>
                    </view>
                    <view class="weui-cell__ft  weui-cell__ft_in-access"></view>
                </view>
            </view>
        </navigator>
    </view>
</template>

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

.order-name {
    border-top: 1rpx solid #d9d9d9;
}
.order-name view {
    padding: 5rpx 0;
}
.order-name .icon {
    display: inline-block;
    padding: 0;
    width: 60rpx;
    height: 70rpx;
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
