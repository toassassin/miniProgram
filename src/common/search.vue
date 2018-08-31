<template>
	<view class="page__bd">
        <!--<a href="javascript:;" class="weui-btn weui-btn_primary">点击展现searchBar</a>-->
        <view class="weui-search-bar weui-search-bar_focusing" id="searchBar">
            <form class="weui-search-bar__form">
                <view class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required v-model="inputVal"/>
                    <view class="weui-icon-clear" v-if="inputVal.length > 0" @tap="clearInput">
                        <icon type="clear" size="14"></icon>
                    </view>
                    <!-- <a href="javascript:" class="weui-icon-clear" id="searchClear"></a> -->
                </view>
            </form>
            <view class="weui-search-bar__cancel-btn" id="searchCancel" @tap="trigger">搜索</view>
        </view>
    </view>
</template>
<script>
	export default{
		data(){
			return{
				inputVal:''
			}
		},
		methods:{
			clearInput(){
				this.inputVal='';
			},
            trigger(){
                this.$emit("input",this.inputVal);
            }
		}
	};
</script>
<style scoped>
</style>
