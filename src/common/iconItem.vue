<template>
	<navigator url="../teacher/main" class="weui-grid" open-type="switchTab" hover-class="weui-grid-active">
		<image class="weui-grid__icon" :src="url" />
        <text class="weui-grid__label">{{text}}</text>
    </navigator>
</template>
<script>
export default {
    props: ["url", "text"],
    data() {
        return {};
    }
};
</script>
<style scoped>
.weui-grid {
    width: 220rpx;
    height: 220rpx;
    margin: 10rpx;
    padding: 50rpx 0 0;
    border: 0;
    box-shadow: 0 0 35rpx rgba(243, 241, 236, 1);
}
.weui-grid__icon {
    width: 76rpx;
    height: 76rpx;
    border-radius: 50%;
}
.weui-grid__label {
    margin-top: 14rpx;
    font-size: 32rpx;
    font-weight: bold;
    color: #404040;
}
</style>
