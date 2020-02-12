//Page Object
Page({
  data: {
    // 轮播图数组
    swiperList: []
  },
  // 页面开始加载时触发的声明周期函数
  onLoad: function(options) {
    // 发送异步请求获取轮播图数据
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      method: 'GET', // 默认请求方式就是GET
      success: (result) => {
        this.setData({
          swiperList: result.data.message
        })
      }
    });
      
  }
});
  