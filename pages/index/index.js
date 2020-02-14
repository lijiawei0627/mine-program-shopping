import { request } from '../../request/index'
Page({
  data: {
    // 轮播图数组
    swiperList: [],
    // 分类导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },
  // 页面开始加载时触发的声明周期函数
  onLoad: function (options) {
    // 发送异步请求获取轮播图数据
    // wx.request({
    //   url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
    //   method: 'GET', // 默认请求方式就是GET
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList () {
    // 使用promise来优化数据请求代码
    request({ url: '/home/swiperdata' })
      .then(result => {
        this.setData({
          swiperList: result
        })
      }, err => {
        console.log(err)
      })
  },
  // 获取分类导航数据
  getCateList () {
    request({ url: '/home/catitems' })
      .then(result => {
        this.setData({
          catesList: result
        })
      }, err => {
        console.log(err)
      })
  },
  // 获取楼层数据
  getFloorList () {
    request({ url: '/home/floordata' })
      .then(result => {
        this.setData({
          floorList: result
        })
      }, err => {
        console.log(err)
      })
  }
});
