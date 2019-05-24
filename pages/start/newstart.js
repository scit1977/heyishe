//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex: function () {
    wx.switchTab({
      url: '/pages/home/home',
    });
  },
  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: '和一舍'
    })
  },
  onShow: function () {
    let that = this

    if (app.globalData.userInfo) {
      let userInfo = app.globalData.userInfo// wx.getStorageSync('userInfo')
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function () {

    var that = this;
    setTimeout(function () {
      that.setData({
       remind: ''
      });
    }, 1200);
   
  }
});