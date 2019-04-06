// page/component/new-pages/user/address/address.js
var zhenzisms = require('../../utils/zhenzisms.js');
const app = getApp();
Page({
  data: {
    uid: '',
    address: {
      name: '',
      tel: '',
      address: '',
      send: false,
      alreadySend: false,
      second: 60,
      disabled: true,      
      code: '',
     
    }
  },

  // 手机号部分
  inputPhoneNum: function (e) {
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          tel: phoneNum
        })
        console.log('phoneNum' + this.data.phoneNum)
        this.showSendMsg()
        this.activeButton()
      }
    } else {
      this.setData({
        tel: ''
      })
      this.hideSendMsg()
    }
  },

  checkPhoneNum: function (phoneNum) {
    let str = /^1\d{10}$/
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showToast({
        title: '手机号不正确',
        image: '../../images/fail.png'
      })
      return false
    }
  },
  showSendMsg: function () {
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },
  //发送验证码
  sendMsg: function () {
    /*var phoneNum = this.data.phoneNum;
    var sessionId = wx.getStorageSync('sessionId');
    wx.request({
      url: `${config.api + '/sendSms.html'}`,
      data: {
        phoneNum: phoneNum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": sessionId
      },
      method: 'POST',
      success: function (res) {
        console.log(res)
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
    */
    console.log('获取验证码');
    var phoneNum = this.data.tel;
    var that = this;
    zhenzisms.client.init('https://smsdeveloper.zhenzikj.com', '101195', '651cbd92-6039-4607-8a55-5fd79c3c3dc4');
    zhenzisms.client.send(function (res) {
      if (res.data.code == 0) {
        that.timer();
        return;
      }
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, phoneNum, '[和一舍]的验证码为:3322');
  },

  timer: function () {
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(
        () => {
          this.setData({
            second: this.data.second - 1
          })
          if (this.data.second <= 0) {
            this.setData({
              second: 60,
              alreadySend: false,
              send: true
            })
            resolve(setTimer)
          }
        }
        , 1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer)
    })
  },

  // 其他信息部分
  addOtherInfo: function (e) {
    this.setData({
      otherInfo: e.detail.value
    })
    this.activeButton()
    console.log('otherInfo: ' + this.data.otherInfo)
  },

  // 验证码
  addCode: function (e) {
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    console.log('code' + this.data.code)
  },

  // 按钮
  activeButton: function () {
    let { phoneNum, code, otherInfo } = this.data
    console.log(code)
    if (phoneNum && code && otherInfo) {
      this.setData({
        disabled: false,
        buttonType: 'primary'
      })
    } else {
      this.setData({
        disabled: true,
        buttonType: 'default'
      })
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
         if(data.result.tel.length==11){
           self.setData({
             send: true
           })
         }
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