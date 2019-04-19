// pages/home/home.js
var app = getApp()
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    bannerHeight: 421.5,// Math.ceil(290.0 / 750.0 * getApp().screenWidth),
    jianjie_txt: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadnews()
  },
  loadnews: function () {
    //postReq(url, data, cb)
    var that = this;
    let url = 'gettopnews.php';
    let data = {
      type: 1,
      page: 1
    }
    http.postReq(url,  data,function (res) {
     console.log(res)
     that.setData({
        // loadingCount: orderList.length,
        imgUrls: res.imgs,
        jianjie_txt: res.jianjie_txt
      });
      var WxParse = require('../../wxParse/wxParse.js');
      WxParse.wxParse('content', 'html', that.data.jianjie_txt, that, 25);
    })
   
   

  },//end of loadmyorders
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})