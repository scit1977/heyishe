const app = getApp();
const http = require('../../utils/http.js');
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              //that.queryUsreInfo();
              that.globalData.userInfo = res.userInfo
              //用户已经授权过
              wx.switchTab({
                url: '/pages/personal/personal'
              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
     
      app.globalData.userInfo = e.detail.userInfo;
      console.log(' e.detail.userInfo.nickName=' + e.detail.userInfo.nickName)
      var that = this;
      let url = 'Wxadduser/';
      let data = {
        uid: app.globalData.openid,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city,
        gender: e.detail.userInfo.gender,
      }
      http.postReq(url, data).then(function (res) {  
      //http.postReq(url, data, function (res) {
         //插入登录的用户的相关信息到数据库
        console.log(res)
        app.globalData.userInfo = e.detail.userInfo
        console.log(res.data)
        console.log("插入小程序登录用户信息成功！");

      })
     
    
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '/pages/personal/personal'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that = this;
    let url = 'getuserInfo/';
    let data = {
      openid: app.globalData.openid
    }
    http.postReq(url, data).then(function (res) {  
    //http.postReq(url, data, function (res) {
      //console.log('getuserInfo/index/')
      //console.log(res)
      app.globalData.userInfo = res;

    })
  
  },

})