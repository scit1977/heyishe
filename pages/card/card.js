// pages/card/card.js
//卡券ID pzyKc1bXM44zcuZSzSSp-EJcwE8E
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var service_url = app.globalData.urlPath + 'wxcard/cardinit.php';//需要将服务器域名添加到小程序的request合法域名中，而且必须是https开头
    wx.request({
      url: service_url,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(res);
        wx.addCard({
          cardList: [{
            cardId: that.data.cardId,
            cardExt: '{"code":"","openid":"oLNQc5K5qqGejOgIlUlrQFI0V4rI","timestamp":' + res.data.timestamp + ',"nonce_str":"' + res.data.nonceStr + '","signature":"' + res.data.signature + '"}'
          }],//这里需要注意的是cardExt参数的value值是 String类型，不要使用对象发送；另外openid如果在创建优惠券的时候没有指定，则这边为空，千万不要填写当前用户的openid
          success: function (result) {
            console.log(res);

            wx.showToast({
              title: '领取成功',
              icon: 'success',
              duration: 2000
            });
          },
          fail: function (res) {
            console.log('领取失败');
            console.log(res);
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