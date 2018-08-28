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

	    </view>
	    <view>
	    	<listTeacher></listTeacher>
            <listTeacher></listTeacher>
	    </view>
	</view>
</template>
<script>
	import search from "../../common/search.vue"
	import listTeacher from "../../common/list-teacher.vue";
	export default{
		components:{
			search,
			listTeacher
		},
		data(){
			return{
				current:9
			}
		},
		onLoad(){
			console.log("load")
		},
		onShow(){
			console.log("show");
		},
		onReady(){
			console.log("ready");
		},
		mounted(){
			// var pages=getCurrentPages();
			console.log("pages=")
		},
		methods:{
			showPanel(event){
				console.log(event.currentTarget)
				this.current=event.currentTarget.dataset.current;
			}
		}
	};
</script>
<style scoped>
	.filter-item{
		height: 80rpx;
	}
	.filter-item view{
		position: relative;
		text-align: center;
		height: 100%;
		line-height: 80rpx;
		border-bottom: 1rpx solid #eee;
	}
	.filter-item view:after{
		position: absolute;
		display: block;
		content: '';
		top: 40rpx;
		right: 15rpx;
		width: 0;
		height: 0;
		border-top: 10rpx solid #ffc851;
		border-right: 10rpx solid transparent;
		border-bottom: 10rpx solid transparent;
		border-left: 10rpx solid transparent;
	}
	.filter-item.active view{
		color: #ffc851;
	}
	.filter-item.active view:after{
		top: 30rpx;
		border-top: 10rpx solid transparent;
		border-right: 10rpx solid transparent;
		border-bottom: 10rpx solid #ffc851;
		border-left: 10rpx solid transparent;
	}
</style>
