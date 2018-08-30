<template>
	<view>
		<search></search>
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
							<view class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="search($event,'county','')">
								<view class="weui-cell__hd">全部</view>
								<view class="weui-cell__ft weui-cell__ft_in-access list-right-arrow"></view>
							</view>
						</view>
						<view class="weui-cells_after-title" v-for="(item,index) in origin" :key="index">
							<view class="weui-cell" hover-class="weui-cell_active" @tap="search($event,'county',item.countyName)">
								<view class="weui-cell__bd">{{item.countyName}}</view>
								<view class="weui-cell__ft  weui-cell__ft_in-access"></view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="filter-box filter-panel-right">
					<scroll-view scroll-y style="height:400rpx;" class="scroll-y">
						<view class="weui-cells_after-title" v-for="(item,index) in school" :key="index">
							<view url="" class="weui-cell weui-cell_access" hover-class="weui-cell_active" @tap="search($event,'schoolId',item.id)">
								<view class="weui-cell__hd">{{item.schoolName}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="filter-panel" v-if="current==1">
				<text @tap="search($event,'subject','数学')">数学</text>
				<text @tap="search($event,'subject','英语')">英语</text>
				<text @tap="search($event,'subject','语文')">语文</text>
				<text @tap="search($event,'subject','物理')">物理</text>
				<text @tap="search($event,'subject','化学')">化学</text>
			</view>
			<view class="filter-panel" v-if="current==2">
				<text @tap="search($event,'sex','1')">男</text>
				<text @tap="search($event,'sex','2')">女</text>
			</view>
			<view class="filter-panel" v-if="current==3">
				<text @tap="search($event,'type','专职老师')">专职老师</text>
				<text @tap="search($event,'type','大学生')">大学生</text>
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
            origin: {},
            school: {},
            // subject: {},
            form: {
                prefix: "cd",
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
        // console.log("pages=");
    },
    methods: {
        search(event, arg, value) {
            console.log(arg);
            var that = this;
            Object.keys(this.form).forEach(function(item, index) {
                if (item == arg) {
                    that.form[item] = value;
                }
            });
            console.log(this.form);
            this.getData();
        },
        async getData() {
            // 市、区
            var origin = await this.$http.get(
                "/common/getPositionCounty",
                this.form
            );
            this.origin = origin.data.data;
            // 学校
            var school = await this.$http.post(
                "/hotUniversity/getUniversityList",
                this.form
            );
            this.school = school.data.data;
            // 科目
            // var subject = await this.$http.get("/index/getSubject", this.form);
            // this.subject = subject.data.data;
            // console.log(this.subject);
            // 教员列表
            var list = await this.$http.post("/teacher/getList", this.form);
            this.list = list.data.data;
            // console.log(this.list);
        },
        showPanel(event) {
            // console.log(event.currentTarget);
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
.filter-panel {
    display: flex;
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
