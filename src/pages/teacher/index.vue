<template>
	<view>
		<search></search>
	    <view class="weui-flex">
	        <view class="weui-flex__item filter-item" :class="{active:current==0}" data-current="0" @tap="showPanel($event)">
	        	<view class="placeholder">weui</view>
	        </view>
	        <view class="weui-flex__item filter-item" :class="{active:current==1}" data-current="1" @tap="showPanel($event)">
	        	<view class="placeholder">weui</view>
	        </view>
	        <view class="weui-flex__item filter-item" :class="{active:current==2}" data-current="2" @tap="showPanel($event)">
	        	<view class="placeholder">weui</view>
	        </view>
	        <view class="weui-flex__item filter-item" :class="{active:current==3}" data-current="3" @tap="showPanel($event)">
	        	<view class="placeholder">weui</view>
	        </view>
	    </view>
	    <view>
			<view class="filter-panel">
				<view class="filter-box filter-panel-left">
					<scroll-view scroll-y style="height:400rpx;" class="scroll-y">
						<view class="weui-cells_after-title">
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">全部</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
						<view class="weui-cells_after-title">
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">wwwww</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
						<view class="weui-cells_after-title">
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">wwwww</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
						<view class="weui-cells_after-title">
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">wwwww</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
						<view class="weui-cells_after-title">
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">wwwww</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
						<view class="weui-cells_after-title">
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">wwwww</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="filter-box filter-panel-right">
					<scroll-view scroll-y style="height:400rpx;" class="scroll-y">
						<view class="weui-cells_after-title">
							<navigator url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">中山大学</view>
							</navigator>
						</view>
						<view class="weui-cells_after-title">
							<navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active">
								<view class="weui-cell__hd">华南理工</view>
							</navigator>
						</view>
					</scroll-view>
				</view>
			</view>
	    </view>
	    <view>
			<scroll-view scroll-y style="height:auto;">
				<view v-for="(item,index) in list.list" :key="index">
					<listTeacher :data="item"></listTeacher>
				</view>
			</scroll-view>
	    </view>
	</view>
</template>
<script>
import search from "../../common/search.vue";
import listTeacher from "../../common/list-teacher.vue";
export default {
    components: {
        search,
        listTeacher
    },
    data() {
        return {
            list: {},
            current: 9
        };
    },
    onLoad() {
        console.log("load");
        this.getData();
    },
    onShow() {
        console.log("show");
    },
    onReady() {
        console.log("ready");
    },
    mounted() {
        console.log("pages=");
    },
    methods: {
        async getData() {
            var list = await this.$http.post("/teacher/getList", {
                prefix: "cd"
            });
            this.list = list.data.data;
            console.log(this.list);
        },
        showPanel(event) {
            console.log(event.currentTarget);
            this.current = event.currentTarget.dataset.current;
        }
    }
};
</script>
<style scoped>
.filter-item {
    height: 80rpx;
}
.filter-item view {
    position: relative;
    text-align: center;
    padding-right: 15rpx;
    box-sizing: border-box;
    height: 100%;
    line-height: 80rpx;
    border-bottom: 1rpx solid #eee;
}
.filter-item view:after {
    position: absolute;
    display: block;
    content: "";
    top: 40rpx;
    right: 25rpx;
    width: 0;
    height: 0;
    border-top: 10rpx solid #ffc851;
    border-right: 10rpx solid transparent;
    border-bottom: 10rpx solid transparent;
    border-left: 10rpx solid transparent;
}
.filter-item.active view {
    color: #ffc851;
}
.filter-item.active view:after {
    top: 30rpx;
    border-top: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-bottom: 10rpx solid #ffc851;
    border-left: 10rpx solid transparent;
}
.filter-panel:after {
    display: block;
    content: "";
    clear: both;
}
.filter-panel .filter-box {
    float: left;
}
.filter-panel-left {
    width: 40%;
}
.scroll-y::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
}
</style>
