<template>
    <view>
        <view class="weui-cells_after-title list-item list-scale">
            <navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
                <view class="weui-cell__hd">
                    <img src="../../static/img/img-man.png" alt="" style="margin-right: 15px;vertical-align: middle;width:90rpx; height: 90rpx;">
                </view>
                <view class="weui-cell__bd list-center">
                    <view>
                        <text class="list-name">{{data.tcName}}/{{data.tcSex==1?"男":"女"}}</text>
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
                <!-- <view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view> -->
            </navigator>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            detatl: {}
        };
    },
    onLoad() {
        this.getData();
    },
    methods: {
        async getData() {
            var that = this;
            var detail = await this.$http.get("/teacher/getDetail", {
                id: "786808527",
                prefix: "cd"
            });
            this.detail = detail.data.data;
            console.log(this.detail);
        }
    }
};
</script>
