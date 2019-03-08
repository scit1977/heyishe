var app = getApp()
Page({
  data: {
    orderList: [],
    page: 1,//默认第一页    
    isHideLoadMore: true,   
    nomore: false,    
    uid:''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面显示
    var that=this
    this.data.uid = wx.getStorageSync('openid')
    console.log('第一次 页面 isHideLoadMore=' + this.data.isHideLoadMore)
    // 这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    //原文：https://blog.csdn.net/qq_35695041/article/details/80236489 
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
   
  
    console.log('加载更多')
    if (!this.data.nomore) {
      this.loadmyorders()
    }
  },
  loadmyorders: function () {
    //if (ifLoadMore) {
    console.log('load loadmyorders')
    console.log('进入时  isHideLoadMore=' + this.data.isHideLoadMore)
    //console.log('page=' + this.data.page)
    this.setData({
      isHideLoadMore: false
    })
    wx.showLoading({
      title: '加载中...'     
    });
    //调取商品信息
    let orderList = [];
    var that = this;
    wx.request({
      url: app.globalData.urlPath + 'getmyorderList.php',
      data: {
        page: this.data.page,
        uid: this.data.uid,
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
          //从数据库获取用户信息     
          //判断是否为空
          //console.log(res)
          //console.log(res.data)
          orderList = that.data.orderList
          //加载更多
          if (res.data.result.length > 0) {
            var page = that.data.page+ 1;  
            for (var i = 0; i < res.data.result.length; i++) {
              orderList.push(res.data.result[i]);
            }
               
            that.setData({
               // loadingCount: orderList.length,
                orderList: orderList,
                page:page
            });
           
          }
          else
          {
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
      },
      complete:function(){
        wx.hideLoading();
      }
    })
    this.setData({
      isHideLoadMore: true
    })
    console.log('结束时 isHideLoadMore=' + this.data.isHideLoadMore)

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