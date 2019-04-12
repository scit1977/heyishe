//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力   
    var that=this; 
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    //wx.setStorageSync('logs', logs)
    // 登录
   
    wx.login({
      success: res => {
        //code 用于获取openID的条件之一
        var code = res.code;
       // console.log('app.js code=' + code);
        wx.request({
          url: that.globalData.urlPath+'/wxpay/wxgetopenid.php',
          //url: 'https://www.heyish.cn/wxshop/wxpay/wxgetopenid.php',
          method: "POST",
          data: {            
            code: code,         
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {  //后端返回的数据
            var data = res.data;
            //console.log(data);
           // console.log(data["uid"]);
            that.globalData.openid = data["uid"]
            wx.setStorageSync('openid', data["uid"])          
          },
          fail: res => {
            toast.show({ content: '微信登录失败' });
          }
        });
      }
    }) // end of login

    // 获取用户信息
    wx.getSetting({
     
      success: res => {
        //console.log('wx.getsetting')
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              //  console.log('app get userinfo')
              //console.log(res.userInfo)
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function () {
              // fail
              console.log("获取失败！")
            },
            complete: function () {
              // complete
             // console.log("获取用户信息完成！")
            }
          })
        }else
        {
          //弹出授权框
         // console.log('要求授权')
         
          //wx.showLoading()
          
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    urlPath:'https://wx.heyishe.cn/wxshop/',
    openid: ''
  }
})