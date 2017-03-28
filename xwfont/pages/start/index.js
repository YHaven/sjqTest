const App = getApp()

Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !1,
    },
    onLoad() {},
    onShow() {},
    bindload(e) {
    	setTimeout(this.goIndex, 3000)
    },
    goIndex() {
        App.WxService.switchTab({
            url: '/pages/popular/popular'
        })
    }
})
