<template>
    <view class="citylist">
        <view class="city-box">
            <view class="title">热门城市</view>
            <view v-if="citys.length===0" style="text-align: center;">loading...</view>
            <view class="citys">
                <text v-for="(item,index) in citys" :key="index" @tap="back(item.prefix)">{{item.cityName}}</text>
            </view>
        </view>
    </view>
</template>
<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            citys: []
        };
    },
    onLoad() {
        this.getData();
    },
    methods: {
        ...mapMutations({
            prefix: "SET_CITY_PREFIX",
            refresh: "SET_REFRESH_FLAG"
        }),
        back(arg) {
            this.prefix(arg);
            this.refresh(1);
            wx.navigateBack({ delta: 1 });
        },
        async getData() {
            var that = this;
            var citys = await this.$http.get("/city/getList");
            this.citys = citys.data.data;
            console.log(citys.data.data)
        }
    }
};
</script>
<style scoped>
.city-box {
    padding: 24rpx;
}
.title {
    font-weight: bold;
}
.citys {
    padding-top: 20rpx;
}
.citys text {
    display: inline-block;
    padding: 4rpx 5rpx;
    margin: 0 15rpx 15rpx 0;
    font-size: 30rpx;
    color: #404040;
}
</style>
