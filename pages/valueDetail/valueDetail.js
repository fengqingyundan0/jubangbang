// pages/valueDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskFlag: false,
    orders_sn: '',
    order: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function () {
        // var that = this;
        setTimeout(function () {
          that.setData({
            maskFlag: true,
          })
        }, 1500)

        var order_id = options.orders_id;
        wx.request({
          url: 'https://mq.mouqukeji.com/api/api/evaluateDetails?orders_id='+order_id,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var res = res.data;
            console.log(res,"评价详情");
            that.setData({
              order: res.data
            })
          }
        })
      }
    })

    setTimeout(function () {
      wx.hideLoading()
    }, 1500)
  }
})