<template>
    <view>
        <view class="weui-cells_after-title list-item list-scale">
            <navigator url="" class="weui-cell weui-cell_access" >
                <view class="weui-cell__hd">
                    <img src="/static/img/img-man.png" alt="" style="margin-right: 15px;vertical-align: middle;width:90rpx; height: 90rpx;">
                </view>
                <view class="weui-cell__bd list-center">
                    <view>
                        <text class="list-name">{{detail.tcName}}/</text><text v-if="detail.tcSex==1">男</text><text v-if="detail.tcSex==2">女</text>
                        <text class="list-code">T{{detail.id}}</text>
                    </view>
                    <view>
                        <view class="list-school"><i class="icon"></i>{{detail.tcSchool}}</view>
                        <view class="list-subject"><i class="icon"></i>{{detail.tcZhuanye}}</view>
                    </view>
                </view>
            </navigator>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            detail: {},
            id:''
        };
    },
    onLoad(options) {
        this.id=options.id;
        this.getData();
    },
    methods: {
        async getData() {
            var that = this;
            var detail = await this.$http.get("/teacher/getDetail", {
                id: this.id,
                prefix: "cd"
            });
            this.detail = detail.data.data;
            console.log(this.detail);
        }
    }
};
</script>
<style scoped>
.list-name {
    font-size: 32rpx;
    color: #404040;
    font-weight: bold;
}
.list-code {
    margin-left: 10rpx;
    font-size: 12px;
    color: #a2a2a2;
    font-weight: bold;
}
.list-school,
.list-subject {
    /*display: inline-block;*/
    font-size: 28rpx;
    margin: 13rpx 15rpx 8rpx 0;
}
.list-school .icon {
    display: inline-block;
    width: 45rpx;
    height: 44rpx;
    margin-right: 10rpx;
    background: url("../../../static/img/img-xuexiao.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
}
.list-subject .icon {
    display: inline-block;
    width: 45rpx;
    height: 44rpx;
    margin-right: 10rpx;
    background: url("../../../static/img/img-subject.png") no-repeat center;
    background-size: cover;
    vertical-align: text-bottom;
}
</style>
