<template>
	<view :class="{fixedScroll:isShow}">
	    <view class="filter-cover" v-if="current<3" @tap="hide"></view>
		<view class="fixed">
			<search @input="getSearchVal" :text="'老师类型/区域'"></search>
		    <view class="weui-flex">
		        <view class="weui-flex__item filter-item" :class="{active:current===0}" data-current="0" @tap="showPanel($event)">
		        	<view class="placeholder">订单状态</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current===1}" data-current="1" @tap="showPanel($event)">
		        	<view class="placeholder">老师要求</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current===2}" data-current="2" @tap="showPanel($event)">
		        	<view class="placeholder">所在区域</view>
		        </view>
		    </view>
		    <view>
				<view class="filter-panel" v-if="current==0">
					<text @tap="search('status','0')">新发布</text>
                    <text @tap="search('status','1')">已安排</text>
                    <text @tap="search('status','2')">已完成</text>
				</view>
				<view class="filter-panel" v-if="current==1">
					<text @tap="search('lsType','专职老师')">专职老师</text>
                    <text @tap="search('lsType','大学生')">大学生</text>
					<text @tap="search('lsType','其他')">其他</text>
				</view>
        <view class="filter-panel" v-if="current==2">
            <text v-for="(item,index) in datalist.dqList" :key="index" @tap="search('dq',item.id)">{{item.countyName}}</text>
        </view>
		    </view>
		</view>
    <view style="margin-top:90px;">
      <view v-if="noMsg" style="text-align: center;">无相关数据</view>
			<scroll-view scroll-y style="background-color:#eee;">
				<view v-for="(item,index) in orderlist" :key="index">
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
            isShow:false,
            datalist: {},
            orderlist: [],
            noMsg:false,
            currentPage: 1,
            form: {
                prefix: "",
                isGetDqList: 1,
                page: 1,
                status: "",
                lsType: "",
                dq: "",
                searchText: ""
            },
            formTamp: {},
            scrollTamp: {},
            current: 9
        };
    },
    onLoad(options) {},
    onShow() {
        this.form.prefix = this.$store.state.prefix;
        this.formTamp = Object.assign({}, this.form);
        this.getData();
    },
    onReady() {
        // console.log("ready");
    },
    onReachBottom() {
        // 订单列表
        var that = this;
        this.scrollTamp.page++;
        if (this.scrollTamp.page > this.totalPage) {
            wx.showToast({
                title: "已是最后一页",
                icon: "none"
            });
            return false;
        }
        this.$http
            .post("/latestOrder/getPageOrder", this.scrollTamp)
            .then(res => {
                that.orderlist = that.orderlist.concat(
                    res.data.data.mapPage.list
                );
            });
    },
    methods: {
        getSearchVal(data) {
            this.search("searchText", data);
        },
        search(arg, value) {
            var that = this;
            this.current = 9;
            this.isShow=false;
            this.formTamp = Object.assign({}, this.form);
            Object.defineProperty(this.formTamp,arg,{value:value});
            // console.log(JSON.stringify(this.formTamp));
            this.getData();
        },
        getData() {
            var that = this;
            this.noMsg=false;
            // 订单列表
            this.$http
                .post("/latestOrder/getPageOrder", this.formTamp)
                .then(res => {
                    that.datalist = res.data.data;
                    that.orderlist = res.data.data.mapPage.list;
                    if(that.orderlist.length===0){
                      that.noMsg=true;
                    }
                    that.totalPage = res.data.data.mapPage.totalPage;
                });

            this.scrollTamp = this.formTamp;
            this.formTamp = {};
        },
        showPanel(event) {
            if (this.current === event.currentTarget.dataset.current) {
                this.isShow=false;
                this.current = 9;
            } else {
                this.isShow=true;
                this.current = event.currentTarget.dataset.current;
            }
        },
        hide(){
          this.current=9;
          this.isShow=false;
        }
    }
};
</script>
<style scoped>
.fixedScroll{
  position: fixed;
  height: 100%;
  overflow: hidden;
}  
.fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 5;
}
.filter-cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
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
    font-size: 28rpx;
}
.filter-item view:after {
    position: absolute;
    display: block;
    content: "";
    top: 36rpx;
    right: 35rpx;
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
    top: 26rpx;
    border-top: 10rpx solid transparent;
    border-right: 10rpx solid transparent;
    border-bottom: 10rpx solid #ffc851;
    border-left: 10rpx solid transparent;
}
.filter-panel text {
    display: inline-block;
    padding: 2px 3px;
    margin: 4px;
    font-size: 28rpx;
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
