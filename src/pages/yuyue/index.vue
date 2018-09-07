<template>
    <view class="yuyue">
        <view class="yuyue-box">
            <view class="title"><i class="icon">简单填写，快速预约老师</i></view>
            <view class="form">
                <form report-submit="true" @submit="formsubmit">
                    <input type="text" hidden="true" id="custom" name="custom" :value="source">
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
                        <view class="weui-cell weui-cell_select" style="width:100%;">
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
            source: "小程序",
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
            console.log(e.mp.detail.value);
            if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(e.mp.detail.value.phone)) {
                wx.showModal({
                    title: "提示",
                    content: "请填写正确的手机号码"
                });
                return false;
            }
            this.$http
                .post("/marketing/consulation/submit", e.mp.detail.value)
                .then(res => {
                    wx.showModal({
                        title: "提示",
                        content: res.data.msg
                    });
                });
        },
        gradeChange(e) {
            this.index1 = e.mp.detail.value;
            if (this.index1 == 0) {
                this.index2 = 0;
            }
        },
        subjectChange(e) {
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
    padding: 70rpx 54rpx 160rpx;
    margin-top: 10rpx;
    border-radius: 10rpx;
    background-color: #fff;
    font-size: 32rpx;
}
.weui-cell {
    padding: 0;
}
.weui-cell:before{
  left: 0;
  border-color: #fff;
}
.weui-cell_input{
  margin-bottom: 90rpx;
  border-bottom: 1px solid #f3f3f3;
}
.weui-cell__hd_in-select-after,
.weui-cell_select {
    padding-left: 0;
}
.weui-select {
    border-right: 0;
}
.weui-select:before {
    right: 45rpx;
    border-width: 0 2px 2px 0;
}
button {
    margin-top: 90rpx;
    background-color: #ffc851;
    border-radius: 0;
    border: 0;
    outline: none;
    color: #fff;
}
</style>
