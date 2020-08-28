// miniprogram/pages/liebiao/liebiao.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:['选择日期'],
    rijiList:[],
  },

  changeDate:function(e){
    this.setData({
      date:e.detail.value
    })
    db.collection("myriji").where({
        time:db.RegExp({
        regexp:e.detail.value,		
        options: 'i',
      })
    }).get().then(res=>{console.log(res)
      console.log(res.data[0]._id)
      this.setData({
        rijiList : res.data,
      })
    })
  
  },

  goToDetail:function(e){
    let id = e.currentTarget.dataset.id
    console.log("携带的id为：",id)
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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