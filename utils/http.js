//const api ='https://t.heyishe.cn/wx/'; //'https://wx.heyishe.cn/wxshop/';
var Promise = require('es6.js')
const root ='https://t.heyishe.cn/wx/';// 'https://wx.heyishe.cn/wxshop/';

var header = {
  'Accept': 'application/json',
  'content-type': 'application/x-www-form-urlencoded',
  'Authorization': null,
}

function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  return new Promise((resove, reject) => {
    wx.request({
      url: root + url,
      data: data,
      header: header,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideLoading();
        resove(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject('fail')
      }
    })
  })
}

function postReq(url, data) {
  wx.showLoading({
    title: '加载中',
  })
  
  //data.method = method
  return new Promise((resove, reject) => {
    wx.request({
      url: root + url,
      data: data,
      header: header,
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      success: function (res) {
        wx.hideLoading();
        resove(res.data)
      },
      fail: function (msg) {
        console.log('reqest error', msg)
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        reject('fail')
      }
    })
  })
}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}
//---------------------
//https://www.cnblogs.com/wuhuacong/p/7442711.html
//版权声明：本文为博主原创文章，转载请附上博文链接！