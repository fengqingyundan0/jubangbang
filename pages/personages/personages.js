Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskFlag: false,
    avatar_url: null,
    nick_name: null,
    address: null,
    name: null,
    mobile: null,
    thr_session: ''
  },
  bindIndentTap: function () {
    wx.navigateTo({
      url: '../Indents/Indents?id=' + this.data.thr_session.user_id
    })
  },
  bindInTap: function () {
    wx.navigateTo({
      url: '../wallet/wallet?id=' + this.data.thr_session.user_id
    })
  },
  bindsInTap: function () {
    wx.navigateTo({
      url: '../Install/Install'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    var thr_session = wx.getStorageSync('thr_session');
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        setTimeout(function () {
          that.setData({
            maskFlag: true,
          })
        }, 500)
        that.setData({
          avatar_url: options.avatar_url,
          nick_name: options.nick_name,
          thr_session: thr_session
        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 500)
  }
})