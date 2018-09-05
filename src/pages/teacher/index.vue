<template>
	<view>
	    <view class="filter-cover" v-if="current<4" @tap="current=9"></view>
		<view class="fixed">
			<search @input="getSearchVal" :text="'学校/科目/性别/类型'"></search>
		    <view class="weui-flex">
		        <view class="weui-flex__item filter-item" :class="{active:current==0}" data-current="0" @tap="showPanel($event)">
		        	<view class="placeholder">学校</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current==1}" data-current="1" @tap="showPanel($event)">
		        	<view class="placeholder">科目</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current==2}" data-current="2" @tap="showPanel($event)">
		        	<view class="placeholder">性别</view>
		        </view>
		        <view class="weui-flex__item filter-item" :class="{active:current==3}" data-current="3" @tap="showPanel($event)">
		        	<view class="placeholder">类型</view>
		        </view>
		    </view>
		    <view>
				<view class="filter-panel" v-if="current==0">
					<view class="filter-box filter-panel-left">
						<scroll-view scroll-y style="height:400rpx;" class="scroll-y">
							<view class="weui-cells_after-title">
								<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="search('county','')">
									<view class="weui-cell__hd">全部</view>
									<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
								</view>
							</view>
							<view class="weui-cells_after-title" v-for="(item,index) in origin" :key="index">
								<view class="weui-cell" hover-class="weui-cell_active" @tap="search('county',item.countyName)">
									<view class="weui-cell__bd">{{item.countyName}}</view>
									<view class="weui-cell__ft  weui-cell__ft_in-access"></view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="filter-box filter-panel-right">
						<scroll-view scroll-y style="height:400rpx;" class="scroll-y">
							<view class="weui-cells_after-title" v-for="(item,index) in school" :key="index">
								<view url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="search('schoolId',item.id)">
									<view class="weui-cell__hd">{{item.schoolName}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="filter-panel" v-if="current==1">
					<text @tap="search('subject','数学')">数学</text>
					<text @tap="search('subject','英语')">英语</text>
					<text @tap="search('subject','语文')">语文</text>
					<text @tap="search('subject','物理')">物理</text>
					<text @tap="search('subject','化学')">化学</text>
				</view>
				<view class="filter-panel" v-if="current==2">
					<text @tap="search('sex','1')">男</text>
					<text @tap="search('sex','2')">女</text>
				</view>
				<view class="filter-panel" v-if="current==3">
					<text @tap="search('type','专职老师')">专职老师</text>
					<text @tap="search('type','大学生')">大学生</text>
				</view>
		    </view>
		</view>
	    <view style="margin-top:90px;">
			<scroll-view scroll-y style="height:auto;">
				<view v-for="(item,index) in list" :key="index">
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
            list: [],
            origin: {},
            school: {},
            // subject: {},
            form: {
                prefix: "",
                schoolId: "",
                schoolName: "",
                subject: "",
                sex: "0",
                type: "",
                countyId: "",
                county: "",
                searchText: "",
                page: "1",
                pageSize: "10"
            },
            formTamp: {},
            scrollTamp: {},
            totalPage: 1,
            current: 9
        };
    },
    onLoad(options) {},
    onShow() {
        this.form.prefix = this.$store.state.prefix;
        this.form.subject = this.$store.state.subject;
        this.formTamp = Object.assign({}, this.form);
        this.getData();
    },
    onReady() {
        // console.log("ready");
    },
    onReachBottom() {
        var that = this;
        this.scrollTamp.page++;
        if (this.scrollTamp.page > this.totalPage) {
            wx.showToast({
                title: "已是最后一页",
                icon: "none"
            });
            return false;
        }
        this.$http.post("/teacher/getList", this.scrollTamp).then(res => {
            that.list = that.list.concat(res.data.data.list);
        });
    },
    methods: {
        getSearchVal(data) {
            this.search("searchText", data);
        },
        search(arg, value) {
            if (arg != "county" && value != "") {
                this.current = 9;
            }
            var that = this;
            this.formTamp = Object.assign({}, this.form);
            Object.defineProperty(this.formTamp,arg,{value:value});
            // console.log(JSON.stringify(this.formTamp));
            this.getData();
        },
        getData() {
            var that = this;
            // 市、区
            this.$http
                .get("/common/getPositionCounty", this.formTamp)
                .then(res => {
                    that.origin = res.data.data;
                });
            // 学校
            this.$http
                .post("/hotUniversity/getUniversityList", this.formTamp)
                .then(res => {
                    that.school = res.data.data;
                });
            // 教员列表
            this.$http.post("/teacher/getList", this.formTamp).then(res => {
                that.list = res.data.data.list;
                that.totalPage = res.data.data.totalPage;
            });

            this.scrollTamp = this.formTamp;
            this.formTamp = {};
        },
        showPanel(event) {
            if (this.current == event.currentTarget.dataset.current) {
                this.current = 9;
            } else {
                this.current = event.currentTarget.dataset.current;
            }
        }
    }
};
</script>
<style scoped>
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
.filter-panel {
    display: flex;
    font-size: 28rpx;
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
