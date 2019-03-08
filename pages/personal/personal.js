// pages/mine/mine.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,//是否有用户信息，默认否
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  
  },
  
  
  onLoad: function () {
    //console.log(' Personal.js app.globalData.userInfo=' + app.globalData.userInfo)
    
    if (app.globalData.userInfo) {
      //1.1判断是否保存了全局用户信息，如果有就直接调取
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log('跳到授权页面')
      wx.reLaunch({
        url: '/pages/authorize/authorize',
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  myAddress: function (e) {
    wx.navigateTo({ url: '../addressList/addressList' });
  }
})
