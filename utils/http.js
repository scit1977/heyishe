const api ='https://t.heyishe.cn/wx/'; //'https://wx.heyishe.cn/wxshop/';

const rootDocment ='https://t.heyishe.cn/wx/';// 'https://wx.heyishe.cn/wxshop/';
var header = {
  'Accept': 'application/json',
  'content-type': 'application/x-www-form-urlencoded',
  'Authorization': null,
}
function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
    //console.log("header=="),
    //console.log(header)
  wx.request({
    url: rootDocment + url,
    method: 'get',
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {
  wx.showLoading({
    title: '加载中',
  })
   // console.log("header=="),
   // console.log(header),
    wx.request({
      url: rootDocment + url,
      header: header,
      data: data,
      method: 'post',
      success: function (res) {
        wx.hideLoading();
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
        })
        return typeof cb == "function" && cb(false)
      }
    })

}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
}
//---------------------
  //作者：皮蛋小粥
//来源：CSDN
//原文：https://blog.csdn.net/qq442270636/article/details/79274128 
//版权声明：本文为博主原创文章，转载请附上博文链接！