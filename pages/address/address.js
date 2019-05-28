// page/component/new-pages/user/address/address.js
const app = getApp();
const http = require('../../utils/http.js');
Page({
  data: {
    uid: '',
    send: false,
    alreadySend: false,
    second: 60,
    disabled: true,
    code: '',
    backcode:'',
    phoneNum:'',
    name:'',
    address:'',   
    wmessage:'',
    couponDetail: {
      logoUrl: 'https://wx.heyishe.cn/img/log100.jpg',
      appName: '和一舍',
      title: '个人信息',
      subTitle: '',
      useCondition: 'useCondition',
      useData: 'useData',
      useTime: '',
      excludeHoliday: '',
      excludeWeekend: '',
      address: 'address',
      phone: 'phone',
      background: ''
    }
   
  },

  
  inputPhoneNum: function (e) {
    // 手机号码输入
   // console.log('inputPhoneNum 函数')
    let phoneNum = e.detail.value
    if (phoneNum.length === 11) {
      let checkedNum = this.checkPhoneNum(phoneNum)
      if (checkedNum) {
        this.setData({
          phoneNum: phoneNum
        })
      //  console.log('phoneNum' + this.data.phoneNum)
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
     //检查手机格式是否正确
    let str = /^1[3-9][0-9]\d{8}$/  // if (!value.tel.match(/^1[3-9][0-9]\d{8}$/)) {
    if (str.test(phoneNum)) {
      return true
    } else {
      wx.showModal({
        title: '错误',
        content: '手机号格式不正确，仅支持国内手机号码',
        showCancel: false
      });
      
     
      return false
    }
  },
  showSendMsg: function () {
   // console.log('showSendMsg 函数')
    //显示发送按钮
    if (!this.data.alreadySend) {
      this.setData({
        send: true
      })
    }
  },

  hideSendMsg: function () {
    //隐藏发送按钮
    this.setData({
      send: false,
      disabled: true,
      buttonType: 'default'
    })
  },
 
  sendMsg: function () {
   //发送验证码
    var phoneNum = this.data.phoneNum;
    var self=this
    var sessionId = wx.getStorageSync('sessionId');
    //console.log('sessionId=' + sessionId)
    wx.request({
      url: app.globalData.urlPath + 'Sendsmsdo/',
      method: "POST",
      data: {
        phoneNum: phoneNum
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": sessionId       
      },     
      success: function (res) {
        var data = res.data; 
        //console.log(res)
       // console.log(data.message)
        //判断验证码发送状态
        if ((data.message === 'OK') && (data.result === 'OK')) {
          wx.showToast({
            title: '验证码发送成功',
            icon: 'success'
          })
          
        } else {
          wx.showModal({
            title: '错误',
            content: '验证码发送失败，请重试！',
            showCancel: false
          });
        
        
        }
       
      }
    })
    this.setData({
      alreadySend: true,
      send: false
    })
    this.timer()
   
   
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

  
  addnameInfo: function (e) {
    // 其他 地址信息部分
    this.setData({
      name: e.detail.value
    })
    this.activeButton()
   // console.log('nameInfo: ' + this.data.otherInfo)
  },
  addaddressInfo: function (e) {
    // 其他 地址信息部分
    this.setData({
      address: e.detail.value
    })
    this.activeButton()
   // console.log('addressInfo: ' + this.data.otherInfo)
  },

  // 验证码
  addCode: function (e) {
   // console.log('addCode 函数')
    this.setData({
      code: e.detail.value
    })
    this.activeButton()
    //console.log('code=' + this.data.code)
  },

  // 按钮
  activeButton: function () {
   // console.log('activeButton 函数')
    let { phoneNum, code, name,address } = this.data
   // console.log('code=='+code)
    if (phoneNum && code && name && address) {
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
    this.get_data()
  
  },
  get_data(){
    var that = this;
    let url = 'Getaddressedit/index/';
    let data = {
      uid: this.data.uid
    }
    http.postReq(url, data).then(function (res) {  
   // http.postReq(url, data, function (res) {
      //console.log(res)      
      that.setData({
        address: res.result.address,
        phoneNum: res.result.tel,
        name: res.result.name,
      })
      wx.setStorageSync('sessionId', res.sessionid)    
     if (res.result.tel!=null){     
      if (res.result.tel.length == 11) {
        that.showSendMsg()
        that.activeButton()
       
      }
     }
    })  
   
   
  },
  input_data(value){
    //console.log(value)
    wx.showLoading({
      title: '请稍后...'
    });
    var sessionId = wx.getStorageSync('sessionId');
    wx.request({
      url: app.globalData.urlPath +'Editaddress/index/',
      //url: 'https://www.heyish.cn/wxshop/wxpay/wxpayindex.php',
      method: "POST",
      data: {
        name: value.name,
        tel: value.tel,
        address: value.address,
        code:value.code,
        uid:this.data.uid,
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        province: app.globalData.userInfo.province,
        city: app.globalData.userInfo.city,
        gender: app.globalData.userInfo.gender,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        "Cookie": sessionId 
      },
      success: function (res) {  //后端返回的数据
        var data = res.data;
        if (data.message ==='ok') {
          wx.showToast({
            title: '提交成功',
            icon: 'success'
          })
          wx.setStorage({
            key: 'address',
            data: value,
            success() {
              wx.navigateBack();
            }
          })
        } else {
          wx.showModal({
            title: '提交失败',
            content: data.result,
            showCancel: false
          });
         
           /* wx.showToast({
            title: data.result,
            icon: 'warn',
            image: '../../images/fail.png',
            duration: 2000
          })*/
        }
        
       // console.log(data);       
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  formSubmit(e) {
   // console.log('formSubmit 函数')
    //console.log(e.detail.value)
    const value = e.detail.value;
    if (!value.tel.match(/^1[3-9][0-9]\d{8}$/)) {
      
      wx.showModal({
        title: '提示',
        content: '手机号格式不正确，仅支持11位国内手机号码',
        showCancel: false
      });
      return false
    }
   // console.log('value.code=' + value.code)
    //console.log('this.data.backcode=' + this.data.backcode)
   
    if (value.name && value.tel && value.address&&value.code) {
      this.input_data(value)
     
    } else {
      wx.showModal({
        title: '提示',
        content: '请填写完整资料',
        showCancel: false
      })
    }
  }
})