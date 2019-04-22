// pages/home/home.js
var app = getApp()
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer: '',//定时器名字
    countDownNum: '8',//倒计时初始值
    isRuleTrue:true,
    imgUrls: [],
    ad_img:'',
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
  //关闭规则提示
  hideRule: function () {
    this.setData({
      isRuleTrue: false
    })
  },
  tofree() {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    //console.log(e.detail)
    wx.navigateTo({
      url: '../card/card'
    });

  },
  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum;//获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () {//这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        //console.log('countDownNum' + countDownNum)
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          that.hideRule()
          //关闭定时器之后，可作其他处理codes go here
        }
      }, 1000)
    })
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
       ad_img: res.ad_img,
        jianjie_txt: res.jianjie_txt
      });
      var WxParse = require('../../wxParse/wxParse.js');
      WxParse.wxParse('content', 'html', that.data.jianjie_txt, that, 25);
    })
   
    this.countDown();

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