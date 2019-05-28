// pages/charge/charge.js
var app = getApp()
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */

  data: {
    ad_img: '',
    items: [],
    price:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.loadcharges()
  },
  loadcharges: function () {
   
   
  
    //调取商品信息
    let items = [];
    var that = this;
    let url = 'getchargelist/';
    let data = {
      type: 1,
      page: 1
    }
    http.postReq(url, data).then(function (res) {  
   // http.postReq(url, data, function (res) {
     // console.log(res)
      that.setData({
        // loadingCount: orderList.length,
        items: res.result,
        ad_img: res.ad_img,
        price: 20000.00
      });
      
    })

   


  },//end of loadmyorders
  radioChange(e) {
   // console.log('radio发生change事件，携带value值为：', e.detail.value)
    //console.log(e.detail)
    this.setData({
      // loadingCount: orderList.length,
      price: e.detail.value

    });
    
  },
  tofree() {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    //console.log(e.detail)
    wx.navigateTo({
      url: '../card/card'
    });

  },
  // 立即购买
  immeBuy() {
    var goods;
   // console.log('this.data.price=' + this.data.price)
    for (var i = 0; i < this.data.items.length; i++) {
      //console.log(this.data.items[i])
      if (this.data.items[i].price == this.data.price) {
        goods = this.data.items[i]
      }
    }
    console.log('充值商品信息')
    console.log(goods)
    // 最后，把购物车数据，存放入缓存  
    var arr = [];
   // var goods = this.data.goods;
    arr.push(goods);
    try {
      wx.setStorageSync('orders', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口


      wx.navigateTo({
        url: '../orders/orders'
      })

    } catch (e) {
      console.log(e)
    }
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