Page({
  data: {//28.167880,112.995960
    height:'',
    latitude: 28.167880,
    longitude: 112.995960,
    markers: [{
      id: 1,
      latitude: 28.167880,
      longitude: 112.995960,
      name: '长沙市雨花区劳动中路20号明星村12楼'
    }]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // 页面显示
    var that=this;
    wx.getSystemInfo({

      success: function (res) {
        var height = res.windowHeight - 50;
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
      phoneNumber: '15974178746' //仅为示例，并非真实的电话号码
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
