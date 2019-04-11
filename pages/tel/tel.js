// pages/tel/tel.js
// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    bannerHeight: 421.5,// Math.ceil(290.0 / 750.0 * getApp().screenWidth),
    jianjie_txt: '',
    phonenum:'13203154009'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadnews()
  },
  makecall: function () {
    var that = this
    //显示“呼叫”、“添加联系人”弹窗
    wx.showActionSheet({
      itemList: ['呼叫', '添加联系人'],
      success: function (res) {
        console.log("点击电话 res：", res)
        if (res.tapIndex == 0) {//直接呼叫
          wx.makePhoneCall({
            phoneNumber: that.data.phonenum,
            success: function (res_makephone) {
              console.log("呼叫电话返回：", res_makephone)
            }
          })
        } else if (res.tapIndex == 1) {//添加联系人
          wx.addPhoneContact({
            firstName: '杨丽博士',
            organization:'和一舍',
            mobilePhoneNumber: that.data.phonenum,
            success: function (res_addphone) {
              console.log("电话添加联系人返回：", res_addphone)
            }
          })
        }
      }
    })
  },

  loadnews: function () {
    //if (ifLoadMore) {
    //console.log('load loadnews')   
    wx.showLoading({
      title: '加载中...'
    });
    //调取商品信息
    let orderList = [];
    var that = this;
    wx.request({
      url: app.globalData.urlPath + 'gettopnews.php',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        //从数据库获取用户信息     
        //判断是否为空
        //console.log(res)
        //console.log(res.data)
        // imgUrls = res.data.imgs
        //加载更多
        if (res.data.message == 'OK') {


          that.setData({
            // loadingCount: orderList.length,
            imgUrls: res.data.imgs,
            jianjie_txt: res.data.jianjie_txt
          });
         // var WxParse = require('../../wxParse/wxParse.js');
          //WxParse.wxParse('content', 'html', that.data.jianjie_txt, that, 25);

        }
        else {
          //没有更多新内容


          wx.showToast({
            title: '获取数据失败，请重试！',
            icon: 'loading',
            duration: 2000
          })
        }
      },
      complete: function () {
        wx.hideLoading();
      }
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