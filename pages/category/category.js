import { request } from '../../request/index'
Page({
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: []
  },
  // 接口返回数据
  cateList: [],
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
        console.log(this.data.rightContent)
      }, err => {
        console.log(err)
      })
  }
})