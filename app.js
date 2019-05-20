//app.js
App({
  globalData: {
    userInfo: null,
    urlPath: 'https://t.heyishe.cn/index.php/wx/',
    openid: '',
    StatusBar:'20',
    CustomBar:'65',
    tabbar_bottom:''
  },
  onLaunch: function () {
    // 展示本地存储能力   
    var that=this;
    //获取屏幕设备属性   
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        let CustomBar = custom.bottom + custom.top - e.statusBarHeight;

        //适配全面屏底部距离
        if (CustomBar > 75) {
          this.globalData.tabbar_bottom = "y"
        }
        console.log(' app.globalData.StatusBar=' + this.globalData.StatusBar)
        console.log(' app.globalData.CustomBar=' + this.globalData.CustomBar)
      },
      fail: e => {
        this.globalData.StatusBar = 22
        this.globalData.CustomBar = 66
      }
    })     
    // 登录
    wx.login({
      success: res => {
        //code 用于获取openID的条件之一
        var code = res.code;
       // console.log('app.js code=' + code);
        wx.request({
         url: that.globalData.urlPath+'wxgetopenid/',
         // url: 'https://t.heyishe.cn/index.php/wx',
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
            //var http = require('utils/http.js')
           // http.header.Authorization = res.data;//给header 赋值         
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
  }
  
})