//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex: function() {
    wx.switchTab({
      url: '/pages/home/home',
    });
  },
  onLoad: function() {
    var that = this
    wx.setNavigationBarTitle({
      title: '和一舍'
    })
  },
  onShow: function() {
    let that = this
   
    if (app.globalData.userInfo) {
      let userInfo = app.globalData.userInfo// wx.getStorageSync('userInfo')
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function() {
    wx.getSystemInfo({
      success: e => {
        app.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        app.globalData.Custom = custom;
        app.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        let CustomBar = custom.bottom + custom.top - e.statusBarHeight;

        //适配全面屏底部距离
        if (CustomBar > 75) {
          app.globalData.tabbar_bottom = "y"
        }
        // console.log('custom=' + custom.top)
        console.log('CustomBar=' + CustomBar)
        //console.log('tabbar_bottom=' + this.globalData.tabbar_bottom)

      }
    })
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) {
        angle = 14;
      } else if (angle < -14) {
        angle = -14;
      }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  }
});