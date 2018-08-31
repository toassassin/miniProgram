<template>
	<view>
	    <view class="filter-cover" v-if="current<3" @tap="current=9"></view>
		<view class="fixed">
			<search></search>
		    <view class="weui-flex">
		        <view class="weui-flex__item filter-item" :class="{active:current==0}" data-current="0" @tap="showPanel($event)">
		        	<view class="placeholder">订单状态</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current==1}" data-current="1" @tap="showPanel($event)">
		        	<view class="placeholder">老师要求</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current==2}" data-current="2" @tap="showPanel($event)">
		        	<view class="placeholder">所在区域</view>
		        </view>
		    </view>
		    <view>
				<view class="filter-panel" v-if="current==0">
					<text @tap="search($event,'status','0')">新发布</text>
                    <text @tap="search($event,'status','1')">已安排</text>
                    <text @tap="search($event,'status','2')">已完成</text>
				</view>
				<view class="filter-panel" v-if="current==1">
					<text @tap="search($event,'lsType','专职老师')">专职老师</text>
                    <text @tap="search($event,'lsType','大学生')">大学生</text>
					<text @tap="search($event,'lsType','其他')">其他</text>
				</view>
                <view class="filter-panel" v-if="current==2">
                    <text v-for="(item,index) in datalist.dqList" :key="index" @tap="search($event,'dq',item.id)">{{item.countyName}}</text>
                </view>
		    </view>
		</view>
	    <view style="margin-top:90px;">
			<scroll-view scroll-y style="background-color:#eee;">
				<view v-for="(item,index) in orderlist.list" :key="index">
					<listOrder :data="item"></listOrder>
				</view>
			</scroll-view>
	    </view>
	</view>
</template>
<script>
import search from "../../common/search.vue";
import listOrder from "../../common/list-order.vue";
export default {
    components: {
        search,
        listOrder
    },
    data() {
        return {
            datalist: {},
            orderlist:{},
            origin: {},
            form: {
                prefix: "cd",
                isGetDqList: 1,
                page: 1,
                status: "",
                lsType: "",
                dq: "",
                searchText:""
            },
            formTamp:{},
            current: 9
        };
    },
    onLoad(options) {
    	// console.log("options="+JSON.stringify(options))
     //    console.log("load");
     //    this.formTamp=Object.assign({},this.form);
     //    this.getData();
    },
    onShow() {
        console.log("show");
        // console.log(wx.getStorageSync("subject"));
        // this.form.subject=wx.getStorageSync("subject");
        this.formTamp=Object.assign({},this.form);
        this.getData();
    },
    onReady() {
        console.log("ready");
    },
    mounted() {
        // console.log("pages=");
    },
    methods: {
        search(event, arg, value) {
            this.current=9;
            console.log(arg);
            var that = this;
            this.formTamp=Object.assign({},this.form);
            Object.keys(this.formTamp).forEach(function(item, index) {
                if (item == arg) {
                    that.formTamp[item] = value;
                }
            });
            // console.log(JSON.stringify(this.formTamp));
            this.getData();
        },
        async getData() {

            // 订单列表
            var datalist = await this.$http.post("/latestOrder/getPageOrder", this.formTamp);
            this.datalist = datalist.data.data;
            this.orderlist=datalist.data.data.mapPage;
            // console.log(this.orderlist);
            //
            this.formTamp={};
        },
        showPanel(event) {
            // console.log(event.currentTarget);
            if(this.current==event.currentTarget.dataset.current){
            	this.current=9;
            }else{

            	this.current = event.currentTarget.dataset.current;
            }
        }
    }
};
</script>
<style scoped>
.fixed{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 5;
}
.filter-cover{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0,0,0,.4);
	z-index: 4;
}
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
.filter-panel {
    /*display: flex;*/
}
.filter-panel text{
	display: inline-block;
	padding: 2px 3px;
	margin: 4px;
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
