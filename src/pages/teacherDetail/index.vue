<template>
    <view style="padding-bottom:1rpx;background-color:#eee;">
        <view class="weui-cells_after-title list-item list-scale">
            <view class="weui-cell weui-cell_access" >
                <view class="weui-cell__hd">
                    <img src="/static/img/img-man.png" alt="" style="margin-right: 15px;vertical-align: middle;width:90rpx; height: 90rpx;">
                </view>
                <view class="weui-cell__bd list-center">
                    <view>
                        <text class="list-name">{{detail.tcName}}/</text><text class="list-sex" v-if="detail.tcSex==1">男</text><text class="list-sex" v-if="detail.tcSex==2">女</text>
                        <text class="list-code">T{{detail.id}}</text>
                    </view>
                    <view>
                        <view class="list-school"><i class="icon"></i>{{detail.tcSchool}}</view>
                        <view class="list-subject"><i class="icon"></i>{{detail.tcZhuanye}}</view>
                    </view>
                </view>
            </view>
        </view>
        <view class="list-item teacher-detail">
            <view class="title"><text>基本资料</text></view>
            <view class="teacher-info">
                <ul>
                    <li>
                        <span>籍贯</span>：
                        <span>{{detail.tcJiguan}}</span>
                    </li>
                    <li>
                        <span>教龄</span>：
                        <span>{{detail.tcJl}}</span>
                    </li>
                    <li>
                        <span>年级</span>：
                        <span>{{detail.tcNj}}</span>
                    </li>
                    <li>
                        <span>所在城市</span>：
                        <span>{{detail.tcCitys}}</span>
                    </li>
                    <li>
                        <span>具体专业</span>：
                        <span>{{detail.tcZhuanye}}</span>
                    </li>
                </ul>
            </view>
        </view>
        <view class="list-item teacher-detail">
            <view class="title"><text>自我评价</text></view>
            <view class="teacher-info">
                <text>{{detail.tcComments}}</text>
            </view>
        </view>
        <view class="list-item teacher-detail">
            <view class="title"><text>家教经验</text></view>
            <view class="teacher-info">
                <text>{{detail.tcCase}}</text>
            </view>
        </view>
        <view class="list-item teacher-detail">
            <view class="title"><text>可授课科目</text></view>
            <view class="teacher-info teacher-subject">
                <text v-for="(item,index) in subjectList" :key="index">{{item}}</text>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            detail: {},
            subjectList: [],
            id: ""
        };
    },
    onLoad(options) {
        this.id = options.id;
        this.getData();
    },
    methods: {
        async getData() {
            var detail = await this.$http.get("/teacher/getDetail", {
                id: this.id,
                prefix: this.$store.state.prefix
            });
            this.detail = detail.data.data;
            this.subjectList = [];
            this.subjectList = this.detail.tcSubjects.split(",");
        }
    }
};
</script>
<style scoped>
.list-item {
    margin-bottom: 20rpx;
    background-color: #fff;
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
    font-size: 28rpx;
    margin: 13rpx 15rpx 8rpx 0;
}
.list-school .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
    background: url("../../../static/img/img-xuexiao.png") no-repeat center;
    background-size: cover;
    vertical-align: middle;
}
.list-subject .icon {
    display: inline-block;
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
    background: url("../../../static/img/img-zhuanye.png") no-repeat center;
    background-size: cover;
    vertical-align: text-bottom;
}
.teacher-detail {
    padding: 20rpx 24rpx 20rpx 40rpx;
    background-color: #fff;
}
.teacher-detail .title {
    position: relative;
    font-size: 32rpx;
    color: #454545;
}
.teacher-detail .title:before {
    position: absolute;
    display: block;
    content: "";
    top: 10rpx;
    left: -16rpx;
    width: 6rpx;
    height: 30rpx;
    background-color: #ffc851;
}
.teacher-info {
    padding-top: 20rpx;
    line-height: 40rpx;
    font-size: 28rpx;
    color: #404040;
}
.teacher-info text {
    color: #767676;
}
.teacher-info span:first-child {
    display: inline-block;
    width: 120rpx;
    text-align: justify;
    text-align-last: justify;
    color: #767676;
}
.teacher-subject text {
    display: inline-block;
    padding: 4rpx 10rpx;
    margin-right: 16rpx;
    margin-bottom: 10rpx;
    text-align: center;
    background-color: #f7f7f7;
    font-size: 28rpx;
    color: #767676;
    white-space: nowrap;
    border-radius: 8rpx;
}
</style>
