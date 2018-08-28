<template>
    <view class="weui-cells_after-title list-item">
        <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
                <img src="../../static/img/img-man.png" alt="" style="margin-right: 15px;vertical-align: middle;width:90rpx; height: 90rpx;">
            </view>
            <view class="weui-cell__bd list-center">
                <view>
                    <text class="list-name">张老师/男</text>
                    <text class="list-code">T434323</text>
                </view>
                <view>
                    <view class="list-school"><i class="icon"></i>深圳大学</view>
                    <view class="list-subject"><i class="icon"></i>语文</view>
                </view>
                <view class="list-disc">
                    <text>oioijoiejfoiwenoiw3u40923jfweoifjiofwoirfwoeifjweifjwep</text>
                </view>
            </view>
            <view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
        </navigator>
    </view>
</template>

<style scoped>
.list-center view {
    max-width: 500px;
    white-space: normal;
    word-break: break-all;
    line-height: 1;
}
.list-name {
    font-size: 32rpx;
    color: #404040;
    font-weight: bold;
}
.list-code {
    font-size: 12px;
    color: #a2a2a2;
    font-weight: bold;
}
.list-school,
.list-subject {
    display: inline-block;
    font-size: 28rpx;
}
.list-subject {
    margin-left: 15rpx;
}
.list-school .icon {
    display: inline-block;
    width: 45rpx;
    height: 44rpx;
    margin-right: 10rpx;
    background: url("../../static/img/img-xuexiao.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
}
.list-subject .icon {
    display: inline-block;
    width: 45rpx;
    height: 44rpx;
    margin-right: 10rpx;
    background: url("../../static/img/img-subject.png") no-repeat center;
    background-size: cover;
    vertical-align: text-bottom;
}
.list-disc {
    font-size: 24rpx;
    color: #767676;
}
view.list-disc {
    line-height: 1.8;
}
.list-right-arrow {
    width: 50rpx;
}

.list-right-arrow:after {
    content: " ";
    display: inline-block;
    height: 15px;
    width: 15px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 4px;
}
.list-item {
    position: relative;
    margin: 0 24rpx;
}
.list-item navigator {
    padding: 20px 0;
}
.list-item:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1rpx solid #d9d9d9;
    color: #d9d9d9;
}
</style>
