// pages/card/card.js
//卡券ID pzyKc1bXM44zcuZSzSSp-EJcwE8E

const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'',
    address: {},
    hasAddress: false,
    cardnum:'1',
    cardId:'',
    logoUrl: 'https://wx.heyishe.cn/img/log100.jpg',
    title: '',
    appName:'和一舍',
    useCondition: '。',
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

  },
  load_cardinfo: function () {
  
    
    var that = this;
    let url = 'Getcardinfo/';
    let data = {
      cardid: that.data.cardnum
    }
    http.postReq(url, data, function (res) {
      //console.log(res)
      res=res.result
      that.setData({
        // loadingCount: orderList.length,
        title: res.card_name,//card_detail 
        useCondition: res.card_detail,//card_detail 
        cardId: res.card_id
      });

    })
   


  },//end of load_cardinfo
  tocard: function () {
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
    let url = 'Wxcardinit/';
    let data = {
      cardid: that.data.cardId
    }
    http.postReq(url, data, function (res) {
      console.log(res)
      console.log(res.timestamp)
      console.log(res.nonce_str)
      console.log(res.signature)
      wx.addCard({
        cardList: [{
          cardId: that.data.cardId,
          cardExt: '{"code":"","openid":"","timestamp":' + res.timestamp + ',"nonce_str":"' + res.nonce_str + '","signature":"' + res.signature + '"}'
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
    this.load_cardinfo();
    this.get_address_data();
  },
  get_address_data() {
   
    var that = this;
    let url = 'getaddress/index/';
    let data = {
      uid: this.data.uid
    }
    http.postReq(url, data, function (res) {
      console.log(res)
      that.setData({
        // loadingCount: orderList.length,
        address: res.result
      });
      if (that.data.address.name != null && that.data.address.name != '' && that.data.address.name != undefined) {
        //console.log('姓名不等于空')
        //if (self.data.address.name.length > 1) {
        that.setData({
          //address: res.data,
          hasAddress: true
        })
      }
    })

   
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