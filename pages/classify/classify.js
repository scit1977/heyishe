// pages/classify/classify.js

const ajax = require('../../utils/ajax.js');
const utils = require('../../utils/util.js');
var sectionData = [];
var ifLoadMore = null;
var classifyId = null;
var page = 1;//默认第一页
Page({

  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    col1: [],
    col2: []
  },

  onLoad: function () {
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;
        console.log('page=' + page)
        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });

        //加载首组图片
        this.loadImages();
      }
    })
  },

  onImageLoad: function (e) {
   
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = null;

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgWidth;
    imageObj.height = imgHeight;

    let loadingCount = this.data.loadingCount - 1;
    let col1 = this.data.col1;
    let col2 = this.data.col2;

    //判断当前图片添加到左列还是右列
    if (col1.length <= col2.length) {
     
     
      col1.push(imageObj);
     
    } else {
   
      
      col2.push(imageObj);
     
    }

    let data = {
      loadingCount: loadingCount,
      col1: col1,
      col2: col2
    };
    console.log('loadingCount=' + loadingCount)
    //当前这组图片已加载完毕，则清空图片临时加载区域的内容
    if (!loadingCount) {
      data.images = [];
    }

    this.setData(data);
  },

  loadImages: function () {
    //if (ifLoadMore) {
    console.log('load Images')
    console.log('page='+page)
    //调取商品信息
    let images=[];
    var that = this;
    ajax.request({
      method: 'GET',
      url: 'getGoodList.php?page='+page,
      success: data => {   
        //判断是否为空
        
        images = data.result.result 
          //加载更多
          if (images.length > 0) { 
            page += 1;   
                  
            let baseId = "img-" + (+new Date());
            for (let i = 0; i < images.length; i++) {
              images[i].id = baseId + "-" + i;
            }
            this.setData({
              loadingCount: images.length,
               images: images
            });
          }else{
            ifLoadMore = false;
            this.setData({
              hidden: true
            })

            wx.showToast({
              title: '暂无更多内容！',
              icon: 'loading',
              duration: 2000
            })
          }
       
       
      }
    })
    
   
  },//end of load image
  catchTap_item: function (e) {
    var that = this;
    console.log(e)
    console.log('e.currentTarget.dataset=' + e.currentTarget.dataset)
    var goodsId = e.currentTarget.dataset.goodsid;
    console.log('classify goodsId:' + goodsId);
    //新增商品用户点击数量
    //that.goodsClickShow(goodsId);
    //跳转商品详情
    wx.navigateTo({ url: '../detail/detail?goodsId=' + goodsId })
  },
 

})