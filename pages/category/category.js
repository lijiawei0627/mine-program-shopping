import { request } from '../../request/index'
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧商品内容滚动条
    scrollTop: 0
  },
  // 接口返回数据
  cateList: [],
  // 左侧菜单点击处理函数
  handleItemTap (e) {
    let { index } = e.currentTarget.dataset;
    // 根据拿到的索引来切换右侧商品列表数据
    let rightContent = this.cateList[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置 右侧内容的scroll-view标签距离顶部的距离
      scrollTop: 0
    })
  },
  // 获取分类数据
  onLoad: function (options) {
    /* 
      0 web中本地存储和小程序中的本地存储的区别
        （1）代码方式不一样
            web：localStorage.setItem("key", "value")  localStorage.getItem("key")
            小程序中：wx.setStorageSync("key", "value")  wx.getStorageSync("key")
        （2）存的时候有没有做类型转换
            web：不管存入的是什么类型的数据，最终偶会先调用toString方法，把数据变为String类型
                  通常我们在localStorage中存储引用类型时，会先调用JSON.stringify方法转为字符串
                  localStorage.setItem('data', JSON.stringify({name: 'lijiawei'}))
            小程序：不存在类型转换操作，存什么类型的数据进去，获取的时候就是什么类型的数据
      1 先判断一下本地存储中有没有旧的数据
      存储格式为：{time:Date.now(), data:[...]}
      2 没有旧数据直接发送新请求
      3 有旧的数据同时旧的数据也没有过期酒使用本地存储中的旧数据即可
    */

  //  获取本地存储中的数据
  const Cates = wx.getStorageSync("cates");
  if (!Cates) {
    // 不存在，即发送请求获取数据
    this.getCates();
  } else if (Date.now() - Cates.item > 1000 * 10) {
    this.getCates();
  } else {
    // 可以使用旧数据
    this.cateList = Cates.data;
    let leftMenuList = this.cateList.map(item => item.cat_name)
    let rightContent = this.cateList[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  }
  },
  getCates () {
    request({ url: '/categories' })
      .then(result => {
        this.cateList = result
        // 把接口的数据存入到本地存储中
        wx.setStorageSync("cates", {time:Date.now(), data:this.cateList});

        let leftMenuList = this.cateList.map(item => item.cat_name)
        let rightContent = this.cateList[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }, err => {
        console.log(err)
      })
  }
})