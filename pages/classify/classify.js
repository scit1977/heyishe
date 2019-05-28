// pages/classify/classify.js
const http = require('../../utils/http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyItems: [],
    curNav: 0,
    curIndex: 0,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0
  },
  tabSelect(e) {
    console.log('tabSelect' + e.currentTarget.dataset.id)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    //console.log('index='+index)
    this.setData({
      curNav: id,
      curIndex: index
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.classifyShow();
  },
  classifyShow: function (success) {
    var that = this;      
    let url = 'getGoodClassList/';
    let data = {}

    http.postReq(url, data).then(function (res) {      
      that.setData({
        classifyItems: res.result
      })
    })

  },
})