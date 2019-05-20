// pages/detail/detail.js
const http = require('../../utils/http.js');
const app = getApp();
var imgUrls = [];
var detailImg = [];
var goodsId = null;
var goods = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar + 7,
    TabbarBot: app.globalData.tabbar_bottom,
    isLike: false,
    showDialog: false,
    goods: null,
    imgs:[],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    bannerHeight: Math.ceil(350.0 / 750.0 * getApp().screenWidth),
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  toBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  toHome() {
    wx.reLaunch({
      url: '/pages/home/home',
    })
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({ url: '../cart/cart' })
  },
  // 立即购买
  immeBuy() {
    // 最后，把购物车数据，存放入缓存  
    var arr=[];
    var goods=this.data.goods;
    //console.log('立即商品信息')
    //console.log(goods)
    arr.push(goods);
    try {
      wx.setStorageSync('orders', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
   
    
      wx.navigateTo({
        url: '../orders/orders'
      })
     
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    goodsId = options.goodsId;
   
    //加载商品详情
    that.goodsInfoShow();
    that.goodsClick(goodsId);
  },
  goodsClick(goodsId) {
    //console.log('增加商品用户点击数量');
    /*var that = this;
    ajax.request({
      method: 'GET',
      url: 'goods/addGoodsClickRate?key=' + utils.key + '&goodsId=' + goodsId,
      success: data => {
        console.log("用户点击统计返回结果：" + data.message)
      }
    })*/
    var that = this;
    let url = 'addGoodsClick/';
    let data = {
      goodsId: goodsId,
      
    }
    http.postReq(url, data, function (res) {
     // console.log(res)
     

    })
  },
  goodsInfoShow: function (success) {
    var that = this;
    let url = 'getGoodsInfo/';
    let data = {
      id: goodsId,

    }
    http.postReq(url, data, function (res) {
     // data=res.reslt
      var goodsItem = res.result;
      var imgs = res.imgs;
     // console.log('goodsItem=')
     // console.log(goodsItem)
      var WxParse = require('../../wxParse/wxParse.js');
      WxParse.wxParse('content', 'html', goodsItem.p_detail, that, 25);
      goods = {
        // imgUrls: imgUrls,
        title: goodsItem.name,
        price: goodsItem.price,
        privilegePrice: goodsItem.privilegePrice,
        detailImg: detailImg,
        imgUrl: goodsItem.imageurl,
        buyRate: goodsItem.buyRate,
        goodsId: goodsId,
        p_detail: goodsItem.p_detail,
        p_type: goodsItem.p_type,
        count: 1,
        totalMoney: goodsItem.price,
      }

      that.setData({
        goods: goods,
        imgs: imgs
      })
    })
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * sku 弹出
   */
  toggleDialog: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
   * sku 关闭
   */
  closeDialog: function () {
    //console.info("关闭");
    this.setData({
      showDialog: false
    });
  },
  /* 减数 */
  delCount: function (e) {
    //console.log("刚刚您点击了减1");
    var count = this.data.goods.count;
    // 商品总数量-1
    if (count > 1) {
      this.data.goods.count--;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  /* 加数 */
  addCount: function (e) {
    //console.log("刚刚您点击了加1");
    var count = this.data.goods.count;
    // 商品总数量-1  
    if (count < 10) {
      this.data.goods.count++;
    }
    // 将数值与状态写回  
    this.setData({
      goods: this.data.goods
    });
    this.priceCount();
  },
  //价格计算
  priceCount: function (e) {
    this.data.goods.totalMoney = this.data.goods.price * this.data.goods.count;
    this.setData({
      goods: this.data.goods
    })
  },
  /**
   * 加入购物车
   */
  addCar: function (e) {
    var goods = this.data.goods;
    goods.isSelect = false;
    var count = this.data.goods.count;

    var title = this.data.goods.title;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }

    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
   // console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].goodsId == goodsId) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].count = arr[j].count + 1;
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      wx.switchTab({

        url: '/pages/cart/cart'

      });
      return;
    } catch (e) {
      console.log(e)
    }


  },
  //跳转到购物车
  handleGoCart: function () {

    wx.switchTab({

      url: '/pages/cart/cart'

    })

  },
})