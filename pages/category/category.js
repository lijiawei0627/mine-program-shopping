import { request } from '../../request/index'
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0
  },
  // 接口返回数据
  cateList: [],
  // 左侧菜单点击处理函数
  handleItemTap (e) {
    let { index } = e.currentTarget.dataset;
    // 根据拿到的索引来改变右侧商品列表数据
    let rightContent = this.cateList[index].children
    this.setData({
      currentIndex: index,
      rightContent
    })
  },
  // 获取分类数据
  onLoad: function (options) {
    this.getCates();
  },
  getCates () {
    request({ url: 'https://api.zbztb.cn/api/public/v1/categories' })
      .then(result => {
        this.cateList = result
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