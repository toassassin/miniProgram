<template>
    <view class="weui-cells_after-title list-item">
        <navigator :url="'../teacherDetail/main?id='+data.id" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <view class="weui-cell__hd">
                <img v-if="data.tcSex==1" src="../../static/img/img-man.png" alt="" style="margin-right: 15px;vertical-align: middle;width:140rpx; height: 140rpx;">
                <img v-else src="../../static/img/img-women.png" alt="" style="margin-right: 15px;vertical-align: middle;width:140rpx; height: 140rpx;">
            </view>
            <view class="weui-cell__bd list-center">
                <view>
                    <text class="list-name">{{data.tcName}}/</text><text class="list-sex" v-if="data.tcSex==1">男</text><text class="list-sex" v-if="data.tcSex==2">女</text>
                    <text class="list-code">T{{data.id}}</text>
                </view>
                <view>
                    <view class="list-school"><i class="icon"></i>{{data.tcSchool}}</view>
                    <view class="list-subject"><i class="icon"></i>{{data.tcZhuanye}}</view>
                </view>
                <view class="list-disc">
                    <text>{{data.tcComments}}</text>
                </view>
            </view>
            <view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
        </navigator>
    </view>
</template>
<script>
export default {
    props: ["data"],
    data() {
        return {};
    }
};
</script>
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
.list-sex {
    font-size: 32rpx;
    color: #404040;
}
.list-code {
    margin-left: 10rpx;
    font-size: 12px;
    color: #a2a2a2;
    font-weight: bold;
}
.list-school,
.list-subject {
    display: inline-block;
    font-size: 28rpx;
    margin: 13rpx 15rpx 8rpx 0;
}
.list-school .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
    background: url("../../static/img/img-xuexiao.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
}
.list-subject .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
    background: url("../../static/img/img-zhuanye.png") no-repeat center;
    background-size: cover;
    vertical-align: text-bottom;
}
view.list-disc {
    font-size: 24rpx;
    color: #767676;
    line-height: 1.8;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.list-right-arrow {
    width: 40rpx;
}

.list-right-arrow:after {
    content: " ";
    display: inline-block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-color: #c8c8cd;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 4px;
}
.list-item {
    position: relative;
}

.list-item:after {
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    border-bottom: 1rpx solid #f3f3f3;
    color: #d9d9d9;
}
.list-item navigator {
    padding: 20rpx 24rpx;
}
</style>
