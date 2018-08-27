<template>
	<navigator url="">
        <view class='weui-grid__bg'>
            <view class="weui-grid__icon">
                <image :src="url" mode="scaleToFill" />
            </view>
            <text class="weui-grid__label">{{text}}</text>
        </view>
    </navigator>
</template>
<script>
	export default {
		props:["url","text"],
		data(){
			return {

			}
		}
	};
</script>
<style scoped>

</style>
