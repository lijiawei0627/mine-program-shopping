/* 
1 发送请求获取数据 
2 点击轮播图 预览大图
  1 给轮播图绑定点击事件
  2 调用小程序的api  previewImage 
3 点击 加入购物车
  1 先绑定点击事件
  2 获取缓存中的购物车数据 数组格式 
  3 先判断 当前的商品是否已经存在于 购物车
  4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
  5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
  6 弹出提示
4 商品收藏
  1 页面onShow的时候  加载缓存中的商品收藏的数据
  2 判断当前商品是不是被收藏 
    1 是 改变页面的图标
    2 不是 。。
  3 点击商品收藏按钮 
    1 判断该商品是否存在于缓存数组中
    2 已经存在 把该商品删除
    3 没有存在 把商品添加到收藏数组中 存入到缓存中即可
 */
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 商品对象
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsDetail(goods_id);
  },
  // 获取商品详情数据
  getGoodsDetail (goods_id) {
    request({ url: "/goods/detail", data: { goods_id } })
    .then((goodsObj) => {
      this.GoodsInfo = goodsObj;
      this.setData({
        goodsObj: {
          // 只提取部分有用数据
          goods_name: goodsObj.goods_name,
          goods_price: goodsObj.goods_price,
          // iphone部分手机 不识别 webp图片格式 
          // 最好找到后台 让他进行修改 
          // 临时自己改 确保后台存在 1.webp => 1.jpg 
          goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: goodsObj.pics
        }
      })
    }, (err) => {
      console.log(err)
    })
  },
  // 点击轮播图 放大预览
  handlePrevewImage(e) {
    // 1 先构造要预览的图片数组 
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    // 2 接收传递过来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击 加入购物车
  handleCartAdd () {
    // 1 获取缓存中购物车数组
    // wx.setStorageSync和wx.setStorage的区别在于
    // wx.setStorageSync为同步缓存
    // wx.setStorage为异步缓存
    let cart = wx.getStorageSync("cart") || [];
    // 2 判断商品对象是否存在于购物车数组中
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      // 3 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 4 已经存在购物车数据 执行num++
      cart[index].num++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 显示透明蒙层，防止触摸穿透(避免用户疯狂点击按钮)
      mask: true
    });
  }

})