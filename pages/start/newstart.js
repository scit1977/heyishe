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
    //console.log(app.globalData.userInfo)
    if (app.globalData.userInfo) {
      let userInfo = app.globalData.userInfo// wx.getStorageSync('userInfo')
      if (userInfo){
        that.setData({
          avator: userInfo.avatarUrl
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