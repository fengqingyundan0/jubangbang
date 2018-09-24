Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  callPhone: function () {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: '4001790720',
      success: function () {
        console.log("调取拨打电话成功");
      }
    })
  }
})