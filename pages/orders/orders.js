// page/component/orders/orders.js
const app = getApp();
Page({
  data: {
    address: {},
    hasAddress: false,
    total: 0,
    orderId:'',
    orders: [     
    ],
    url:''

  },

  onReady() {
    this.getTotalPrice();
  },

  onShow: function () {
    this.data.uid = wx.getStorageSync('openid')
    var pages = getCurrentPages() //获取加载的页面

    var currentPage = pages[pages.length - 2] //获取当前页面的对象

    var url = currentPage.route //当前页面url
    console.log(url)
    this.setData({
      url:url,
    })
    var arr = wx.getStorageSync('orders') || [];
    console.info("orders.js 缓存数据：" + arr[0]['title']);
    // 有数据的话，就遍历数据，计算总金额 和 总数量  
    if (arr.length > 0) {
      // 更新数据  
      this.setData({
        orders: arr,       
      });
      // console.info("缓存数据：" + this.data.orders);
    } else {
       console.log('结算数据为空')
    }
    const self = this;
    //获取用户地址信息
    this.get_address_data();
   
   /* wx.getStorage({
      key: 'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })*/
  },
  get_address_data() {
    var self = this;
    wx.showLoading({
      title: '加载中...'
    });
    wx.request({
      url: app.globalData.urlPath + 'getaddress.php',
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
        console.log('this.data.address.name' + self.data.address.name)
        //console.log('this.data.address.name.length' + this.data.address.name.length)
        if (self.data.address.name != null && self.data.address.name != '' && self.data.address.name != undefined) {
          //console.log('姓名不等于空')
          //if (self.data.address.name.length > 1) {
            self.setData({
              //address: res.data,
              hasAddress: true
            })
          //}

        }
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for (let i = 0; i < orders.length; i++) {
      total += orders[i].count * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {
    if (!this.data.hasAddress){
    wx.showModal({
      title: '提示',
      content: '请先完善个人信息',
      text: 'center',
      complete() {
        wx.switchTab({
          url: '/pages/personal/personal'
        })
      }
    })}else{
      //开始支付
      this.requestPayParam();
    }
  },
  //向服务请求支付参数
  requestPayParam: function () {
    let that = this;
    var total_fee = this.data.total;
    var orderId = this.data.orderId;
    var orders = this.data.orders;
    var address = this.data.address;
    console.log(orders);
    wx.login({
      success: res => {

        //code 用于获取openID的条件之一
        var code = res.code;
        //console.log('orders.js code=' + code);
        wx.request({
          url: app.globalData.urlPath +'wxpay/wxpayindex.php',        
          method: "POST",
          data: {
            total_fee: total_fee,
            code: code,
            orderId: orderId,
            orders: JSON.stringify(orders),            
            address: JSON.stringify(address)
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function (res) {  //后端返回的数据
            var data = res.data;
            //console.log(data);
            //console.log(data["timeStamp"]);
            //console.log(data["nonceStr"]);
            wx.requestPayment({
              timeStamp: data['timeStamp'],
              nonceStr: data['nonceStr'],
              package: data['package'],
              signType: data['signType'],
              paySign: data['paySign'],
              success: function (res) {
                wx.showModal({
                  title: '支付成功',
                  content: '',
                })
                //清除购物车数据和订单数据
                let arr=[];
                wx.setStorageSync('cart', arr)
                wx.setStorageSync('orders', arr)
                //跳转到我的订单
                if (that.data.url =='pages/charge/charge'){
                  wx.reLaunch({
                    url: '/pages/mycharge/mycharge',
                  })
                }else{
                  wx.reLaunch({
                    url: '/pages/myorder/myorder',
                  })
                }
              
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        });


      }
    })
    // ---------------------
    // 作者：weixin_42237632
    //来源：CSDN
    //原文：https://blog.csdn.net/weixin_42237632/article/details/80648927 
    //版权声明：本文为博主原创文章，转载请附上博文链接！
  }
})