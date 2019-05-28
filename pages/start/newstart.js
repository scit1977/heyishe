var app = getApp();
Page({
  data: {   
    avator:'/images/log100.jpg',
    remind:'loading'    
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
      if (userInfo){
        that.setData({
          avator: userInfo.avatarUrl
        })
      }
     
    }else{
      // console.log('page2');
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      // 给app.js 定义一个方法。
      app.userInfoReadyCallback = res => {
        that.setData({
          avator: res.userInfo.avatarUrl
          
        })
      }
     
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