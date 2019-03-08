// page/component/new-pages/user/address/address.js
const app = getApp();
Page({
  data: {
    uid: '',
    address: {
      name: '',
      tel: '',
      address: '',
     
    }
  },
  onLoad() {
    this.data.uid = wx.getStorageSync('openid')
    //console.log('this.uid=' + this.data.uid)   
    this.get_data()
  
  },
  get_data(){
    var self=this;
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.urlPath +'getaddress.php',     
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
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  input_data(value){
    //console.log(value)
    wx.showLoading({
      title: '请稍后...'
    });
    wx.request({
      url: app.globalData.urlPath +'editaddress.php',
      //url: 'https://www.heyish.cn/wxshop/wxpay/wxpayindex.php',
      method: "POST",
      data: {
        name: value.name,
        tel: value.tel,
        address: value.address,
        uid:this.data.uid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {  //后端返回的数据
        var data = res.data;
        console.log(data);       
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  formSubmit(e) {
    console.log(e.detail.value)
    const value = e.detail.value;
    if (!value.tel.match(/^1[3-9][0-9]\d{8}$/)) {
      wx.showModal({
        title: '错误',
        content: '手机号格式不正确，仅支持国内手机号码'
      });
      return false
    }
    if (value.name && value.tel && value.address) {
      this.input_data(value)
      wx.setStorage({
        key: 'address',
        data: value,
        success() {
         wx.navigateBack();
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})