const app = getApp();
Page({
  data: {//28.167880,112.995960
    height:'',
    latitude: 28.168294,
    longitude: 112.996182,
    markers: [{
      id: 1,
      latitude: 28.168294,
      longitude: 112.996182,
      name: '长沙市雨花区劳动中路20号明星村12楼'
    }]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面显示
    var that=this;
    wx.getSystemInfo({

      success: function (res) {
        //CustomBar
        console.log('res.windowHeight' + res.windowHeight);
        console.log('app.globalData.StatusBar' + app.globalData.StatusBar);
        console.log('app.globalData.CustomBar' + app.globalData.CustomBar);
        var height = res.windowHeight - app.globalData.CustomBar- 40;
        console.log(height);
        that.setData({

          height: height+'px'

        });

      }
    })
   
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  makecall:function(){
    wx.makePhoneCall({
      phoneNumber: '13203154009' //仅为示例，并非真实的电话号码
    })
  },
  daohang: function (e) {
    wx.openLocation({
      latitude: 28.168294,
      longitude: 112.996182,
      scale: 18,
      name: '和一舍',
      address: '长沙市雨花区劳动中路20号明星村12楼'
    })
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 23.10229,
        longitude: 113.3345211,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 23.10229,
        longitude: 113.3345211,
      }, {
        latitude: 23.00229,
        longitude: 113.3345211,
      }]
    })
  }
})
