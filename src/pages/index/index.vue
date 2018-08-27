<template>
  <div>

  </div>
</template>

<script>
export default {
    data() {
        return {};
    },

    components: {},
    onLoad() {
        this.getData();
    },
    methods: {
        async getData() {
            var data = await this.$http.get(
                "http://47.106.115.52:19091/index/getHeader?prefix=cd"
            );
            console.log(data);
        },
        bindViewTap() {
            const url = "../logs/main";
            wx.navigateTo({ url });
        },
        getUserInfo() {
            // 调用登录接口
            wx.login({
                success: () => {
                    wx.getUserInfo({
                        success: res => {
                            this.userInfo = res.userInfo;
                        }
                    });
                }
            });
        }
    }
};
</script>

<style scoped>
</style>
