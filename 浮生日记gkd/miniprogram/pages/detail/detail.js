// miniprogram/pages/detail/detail.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    biaoti:"",
    imgurl:"",
    neirong:"",
    time:"",
    city:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    console.log("id:",options.id)
    db.collection("myriji").where({
      _id : id
    }).get().then(res=>{
      console.log("查询：",res.data[0].imgurl)
      this.setData({
        biaoti: res.data[0].biaoti,
        imgurl: res.data[0].imgurl,
        neirong: res.data[0].neirong,
        time: res.data[0].time,
        city:res.data[0].city,
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

  }
})