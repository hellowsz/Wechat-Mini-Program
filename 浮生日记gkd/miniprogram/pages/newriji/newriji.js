const db = wx.cloud.database()
var simages = require('../../utils/simages.js')

Page({
  data: {
    isaddimages:false,
    url:"/images/100.png"
  },

  uploadimages: function(){ 
    console.log("上传图片")
    var that = this
  //选择图片
    wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths//有一个临时目录
      //获取时间戳
      var timestamp = Date.parse(new Date());  
      timestamp = timestamp / 1000;  
      console.log("当前时间戳为：" + timestamp);  

      const filePath = res.tempFilePaths[0];
      const cloudPath = timestamp+filePath.match(/\.[^.]+?$/)[0];
      //调用上传的代码，云开发
      wx.cloud.uploadFile({
        cloudPath: cloudPath, // 上传至云端的路径
        filePath: filePath, // 小程序临时文件路径
        success: res => {
          // 返回文件 ID
          console.log("res.fileID=" ,res.fileID)
          console.log("res = ", res)
          let cloudpath = res.fileID
          console.log("fileID",cloudpath)
          wx.cloud.getTempFileURL({
            fileList:[cloudpath],
           success: res => {
             
             console.log("res.filelist = ",res.fileList)
             // fileList 是一个有如下结构的对象数组
             // [{
             //    fileID: 'cloud://xxx.png', // 文件 ID
             //    tempFileURL: '', // 临时文件网络链接
             //    maxAge: 120 * 60 * 1000, // 有效期
             // }]
             console.log("完成")
             console.log(res.fileList)
             let tempFileURL = res.fileList[0].tempFileURL
             console.log(tempFileURL)
             that.setData({
               url:tempFileURL,
               isaddimages:true
            })
           },
           fail: console.error
         })
        },
        fail: console.error
      })
    }
  }) 
  },

  baocunneirong:function (res) {
    console.log(res)
    var biaoti = res.detail.value.biaoti
    var neirong = res.detail.value.neirong
    var imgurl = this.data.url
    var tianqi = getApp().globalData.now.cond_txt
    var time = getApp().globalData.time
    var city = getApp().globalData.city
    getApp().globalData.newestdate = getApp().globalData.time
    db.collection("myriji").add({
      data:{
        biaoti:biaoti,
        neirong:neirong,
        imgurl:imgurl,
        tianqi:tianqi,
        time:time,
        city:city
      }
    }).then(res=>{wx.showToast({
      title: '保存成功',
      icon: 'success',  // 图标类型，默认success
      duration: 500
    })
  }).then(res=>{wx.navigateTo({
    url: '../riji/riji',
  })})
  },
  getdate:function(){
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