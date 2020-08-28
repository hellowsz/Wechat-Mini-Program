const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['北京市','北京市','东城区'],
    update:"",
    now:'',
    time:'',
    loc:"",
    imgurl:"",
    neirong:""
  },

  gotoaddpage:function(){
    wx.navigateTo({
      url: '../newriji/newriji',
    })
  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.getWeater(); //更新天气
  },
  getWeater:function(){
    
    var that=this; //this不可以直接在wxAPI函数内部使用
    console.log(that.data.loc)
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.loc,
        key:'679a134a262d4ae1a5caf1c4118b0c0c'
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          now:res.data.HeWeather6[0].now,
          time:res.data.HeWeather6[0].update.loc,
        })
        getApp().globalData.now=res.data.HeWeather6[0].now,
        getApp().globalData.time=res.data.HeWeather6[0].update.loc
        getApp().globalData.city=res.data.HeWeather6[0].basic.parent_city
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getLocation({
      success: function(res){
        var locat=res.longitude.toString()+","+res.latitude.toString()
        that.data.loc=locat
        console.log(that.data.loc)
        that.getWeater()
      },
    })
    var newestdate =toString(getApp().globalData.newestdate)
    db.collection("myriji").where({
      time:db.RegExp({
      regexp:newestdate,		//queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
      options: 'i',
    })
  }).get().then(res=>{
                      console.log(res)
                      that.setData({
                       imgurl: res.data[0].imgurl,
                       neirong:res.data[0].neirong,
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