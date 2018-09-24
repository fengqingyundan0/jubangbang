// pages/valueList/valueList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskFlag: false,
    server_id: '',
    order: '',
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function() {
        // var that = this;
        setTimeout(function() {
          that.setData({
            maskFlag: true,
          })
        }, 1500)

        var server_id = options.server_id;
        that.setData({
          server_id: server_id
        })
        wx.request({
          url: 'https://mq.mouqukeji.com/api/api/evaluateDriver?server_id=' + server_id,
          method: 'GET',
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var res = res.data;
            console.log(res, "评价详情");
            that.setData({
              order: res.data
            })
          }
        })
      }
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 1500)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    var that = this;
    // 显示加载图标
    var page = that.data.page + 1;
    wx.showLoading({
      title: '加载更多...',
      success: function() {
        wx.request({
          url: 'https://mq.mouqukeji.com/api/api/evaluateDriver',
          method: 'GET',
          data: {
            server_id: that.data.server_id,
            page: page
          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            console.log(res)
            var order = that.data.order;
            for (var i = 0; i < res.data.data.length; i++) {
              order.push(res.data.data[i]);
            }
            // 设置数据
            that.setData({
              order: order,
              page: page
            })
          }
        })
      }
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  }
})