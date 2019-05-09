const http = require('../../utils/http.js');
Page({
  data: {
    orderList: [],
    page: 1,//默认第一页    
    isHideLoadMore: true,   
    nomore: false,    
    uid:''   
  },
  
  onLoad: function (options) {
  
    var that=this
    this.data.uid = wx.getStorageSync('openid')
   
    wx.getSystemInfo({

      success: function (res) {

        that.setData({

          scrollHeight: res.windowHeight

        });

      }
    }) 
    this.loadmyorders();
  },

  //下拉刷新
  onPullDownRefresh: function () {
    console.log('下拉刷新')
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({     
      page: 1,
      nomore:false,
      orderList:[]
    });
    this.loadmyorders()
    
    
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    /*---------------------  
    原文：https://blog.csdn.net/u012927188/article/details/73369201

  */
  },

  /**       * 页面上拉触底事件的处理函数       */
  onReachBottom: function () {  
   
    if (!this.data.nomore) {
      wx.showNavigationBarLoading() //在标题栏中显示加载
      this.loadmyorders()
      wx.hideNavigationBarLoading() //完成停止加载
    }
  },
  loadmyorders: function () {
  
    this.setData({
      isHideLoadMore: false
    })
    let orderList = [];
    var that = this;
    let url = 'GetmyorderList/index/';
    let data = {
      page: this.data.page,
      uid: this.data.uid,
    }
    http.postReq(url, data, function (res) {
    
      orderList = that.data.orderList
      //加载更多
    
      if (res.result.data.length > 0) {
       
        var page = that.data.page + 1;
        for (var i = 0; i < res.result.data.length; i++) {
          orderList.push(res.result.data[i]);
        }

        that.setData({         
          orderList: orderList,
          page: page
        });

      }
      else {
        //没有更多新内容
        that.setData({
          nomore: true
        })

        wx.showToast({
          title: '没有更多记录！',
          icon: 'loading',
          duration: 2000
        })
      }

    })
    this.setData({
      isHideLoadMore: true
    })
   
   

  },//end of loadmyorders

 
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})