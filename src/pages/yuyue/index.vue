<template>
    <view class="yuyue">
        <view class="yuyue-box">
            <view class="title"><i class="icon">简单填写，快速预约老师</i></view>
            <view class="form">
                <form report-submit="true" @submit="formsubmit">
                    <view class=" weui-cells_after-title">
                        <view class="weui-cell weui-cell_input">
                            <view class="weui-cell__hd">
                                <view class="weui-label">姓名</view>
                            </view>
                            <view class="weui-cell__bd">
                                <input class="weui-input" id="name" name="name" placeholder="请输入姓名"/>
                            </view>
                        </view>
                        <view class="weui-cell weui-cell_input weui-cell_vcode">
                            <view class="weui-cell__hd">
                                <view class="weui-label">手机号</view>
                            </view>
                            <view class="weui-cell__bd">
                                <input class="weui-input" id="phone" name="phone" placeholder="请输入手机号" />
                            </view>
                        </view>
                    </view>
                    <view class="weui-cell weui-cells_after-title">
                        <view class="weui-cell weui-cell_select">
                            <view class="weui-cell__hd weui-cell__hd_in-select-after">
                                <view class="weui-label">年级/科目</view>
                            </view>
                            <view class="weui-cell__bd">
                                <picker id="grade" name="grade" @change="gradeChange" :value="index1" :range="grade">
                                    <view class="weui-select weui-select_in-select-after">{{grade[index1]}}</view>
                                </picker>
                            </view>
                            <view class="weui-cell__bd" v-if="index1==0">
                                <picker id="subject" name="subject" @change="subjectChange" :value="index2" :range="subjects1">
                                    <view class="weui-select weui-select_in-select-after">{{subjects1[index2]}}</view>
                                </picker>
                            </view>
                            <view class="weui-cell__bd" v-else>
                                <picker id="subject" name="subject"  @change="subjectChange" :value="index2" :range="subjects2">
                                    <view class="weui-select weui-select_in-select-after">{{subjects2[index2]}}</view>
                                </picker>
                            </view>
                        </view>
                    </view>
                    <button class="btn" formType="submit">提交</button>
                </form>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            index1: 0,
            index2: 0,
            grade: ["小学", "初中", "高中", "其他"],
            subjects1: ["课业辅导", "语文", "数学", "英语"],
            subjects2: [
                "课业辅导",
                "语文",
                "数学",
                "物理",
                "化学",
                "文综",
                "其他"
            ]
        };
    },
    methods: {
        formsubmit: function(e) {
            console.log(
                "form发生了submit事件，携带数据为：",
                e.mp.detail.value
            );
        },
        gradeChange(e) {
            console.log(e.mp.detail.value);
            this.index1 = e.mp.detail.value;
        },
        subjectChange(e) {
            console.log(e.mp.detail.value);
            this.index2 = e.mp.detail.value;
        }
    }
};
</script>
<style scoped>
.yuyue {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffc851;
}
.yuyue-box {
    margin: 100rpx 24rpx auto;
}
.title {
    padding-left: 60rpx;
    font-size: 28rpx;
    background: url("../../../static/img/img-book.png") no-repeat left top;
    background-size: 6% 90%;
    color: #fff;
}
.form {
    margin-top: 10rpx;
    /* height: 60%; */
    border-radius: 10rpx;
    background-color: #fff;
    font-size: 32rpx;
}
.weui-cell {
    width: 100%;
    padding: 0px 30rpx;
}
.weui-cell__hd_in-select-after,
.weui-cell_select {
    padding-left: 0;
}
.weui-select {
    border-right: 0;
    text-align: center;
}
.weui-select:before {
    right: 60rpx;
    border-width: 0 2px 2px 0;
}
</style>
