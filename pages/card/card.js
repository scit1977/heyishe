// pages/card/card.js
//卡券ID pzyKc1bXM44zcuZSzSSp-EJcwE8E
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'',
    address: {},
    hasAddress: false,
    cardId:'pzyKc1bXM44zcuZSzSSp-EJcwE8E',
    couponDetail: {
      logoUrl: 'https://wx.heyishe.cn/img/log100.jpg',
      appName: '和一舍',
      title: '优惠券',
      subTitle: '',
      useCondition: '新人专享，每人一张，盘龙灸体验卷，需提前一天电话预约',
      useData: 'useData',
      useTime: '',
      excludeHoliday: '',
      excludeWeekend: '',
      address: 'address',
      phone: 'phone',
      background: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },
  tocard() {
    if (!this.data.hasAddress) {
      wx.showModal({
        title: '提示',
        content: '请先完善个人信息',
        text: 'center',
        complete() {
          wx.switchTab({
            url: '/pages/personal/personal'
          })
        }
      })
    } else {
      //开始支付
      this.getcard();
    }
  },
  getcard: function () {
    var that = this;
    var service_url = app.globalData.urlPath + 'wxcard/cardinit.php';//需要将服务器域名添加到小程序的request合法域名中，而且必须是https开头
    wx.request({
      url: service_url,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res);
        console.log('wx.addCard')
        wx.addCard({
          cardList: [{
            cardId: that.data.cardId,
            cardExt: '{"code":"","openid":"","timestamp":' + res.data.timestamp + ',"nonce_str":"' + res.data.nonce_str + '","signature":"' + res.data.signature + '"}'
          }],//这里需要注意的是cardExt参数的value值是 String类型，不要使用对象发送；另外openid如果在创建优惠券的时候没有指定，则这边为空，千万不要填写当前用户的openid
          success: function (result) {
            console.log('领取成功');
            console.log(result);

            /* wx.showToast({
               title: '领取成功',
               icon: 'success',
               duration: 2000
             });*/
          },
          fail: function (result) {
            console.log('领取失败');
            console.log(result);
          },
          complete: function (res) {
            console.log('领取完成');
            console.log(res)
          }
        })

      }
    })
  }, 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var uid = wx.getStorageSync('openid')
    this.setData({
      uid: uid
    })
    this.get_address_data();
  },
  get_address_data() {
    var self = this;
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.urlPath + 'getaddress.php',
      method: "POST",
      data: {
        uid: this.data.uid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {  //后端返回的数据
        var data = res.data;
        // console.log(data.result);
        self.setData({
          address: data.result
        })
        console.log('this.data.address.name' + self.data.address.name)
        //console.log('this.data.address.name.length' + this.data.address.name.length)
        if (self.data.address.name != null && self.data.address.name != '' && self.data.address.name != undefined) {
          //console.log('姓名不等于空')
          //if (self.data.address.name.length > 1) {
          self.setData({
            //address: res.data,
            hasAddress: true
          })
          //}

        }
      },
      complete: function () {
        wx.hideLoading();
      }
    });
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